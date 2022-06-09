import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
export interface IGetSpListItemsWebPartProps {
    description: string;
}
export interface ISPLists {
    value: ISPList[];
}
export interface ISPList {
    Title: string;
    Medicals: string;
    Assessment: string;
}
export default class GetSpListItemsWebPart extends BaseClientSideWebPart<IGetSpListItemsWebPartProps> {
    private _getListData;
    private _renderListAsync;
    private _renderList;
    render(): void;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=GetSpListItemsWebPart.d.ts.map