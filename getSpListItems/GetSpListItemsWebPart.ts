import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './GetSpListItemsWebPart.module.scss';
import * as strings from 'GetSpListItemsWebPartStrings';

import {
  SPHttpClient,
  SPHttpClientResponse   
} from '@microsoft/sp-http';
import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';

export interface IGetSpListItemsWebPartProps {
  description: string;
}
export interface ISPLists {
  value: ISPList[];
}

export interface ISPList {
  Title: string;
  Medicals : string;
  Assessment :string;
}
  
export default class GetSpListItemsWebPart extends BaseClientSideWebPart<IGetSpListItemsWebPartProps> {
  private _getListData(): Promise<ISPLists> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/_api/web/lists/GetByTitle('Audit Tool Data')/Items",SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
        return response.json();
        });
    }
    private _renderListAsync(): void {
    
      if (Environment.type == EnvironmentType.SharePoint || 
               Environment.type == EnvironmentType.ClassicSharePoint) {
       this._getListData()
         .then((response) => {
           this._renderList(response.value);
         });
     }
   }
    private _renderList(items: ISPList[]): void {
      let html: string = '<table border=1 width=100% style="border-collapse: collapse;">';
      html += '<th>Title</th><th>Medical</th><th>Assessment</th>';
      items.forEach((item: ISPList) => {
        html += `
          <tr>            
            <td>${item.Title}</td>
            <td>${item.Medicals}</td>
            <td>${item.Assessment}</td>            
          </tr>
        `;
      });
      html += '</table>';
    
      const listContainer: Element = this.domElement.querySelector('#spListContainer');
      listContainer.innerHTML = html;
    }
      
  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.getSpListItems }">
        <div class="${ styles.container }">
          <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${ styles.row }">
          <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
          <span class="ms-font-xl ms-fontColor-white">Welcome to SharePoint Modern Developmennt</span>
          <p class="ms-font-l ms-fontColor-white">Loading from ${this.context.pageContext.web.title}</p>
          <p class="ms-font-l ms-fontColor-white">Retrive Data from SharePoint List</p>
        </div>
      </div> 
          <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
          <div>List Items</div>
          <br>
           <div id="spListContainer" />
        </div>
      </div>`;
      this._renderListAsync();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}