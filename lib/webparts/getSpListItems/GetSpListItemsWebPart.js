var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import styles from './GetSpListItemsWebPart.module.scss';
import * as strings from 'GetSpListItemsWebPartStrings';
import { SPHttpClient } from '@microsoft/sp-http';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
var GetSpListItemsWebPart = /** @class */ (function (_super) {
    __extends(GetSpListItemsWebPart, _super);
    function GetSpListItemsWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GetSpListItemsWebPart.prototype._getListData = function () {
        return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/_api/web/lists/GetByTitle('Audit Tool Data')/Items", SPHttpClient.configurations.v1)
            .then(function (response) {
            return response.json();
        });
    };
    GetSpListItemsWebPart.prototype._renderListAsync = function () {
        var _this = this;
        if (Environment.type == EnvironmentType.SharePoint ||
            Environment.type == EnvironmentType.ClassicSharePoint) {
            this._getListData()
                .then(function (response) {
                _this._renderList(response.value);
            });
        }
    };
    GetSpListItemsWebPart.prototype._renderList = function (items) {
        var html = '<table border=1 width=100% style="border-collapse: collapse;">';
        html += '<th>Title</th><th>Medical</th><th>Assessment</th>';
        items.forEach(function (item) {
            html += "\n          <tr>            \n            <td>" + item.Title + "</td>\n            <td>" + item.Medicals + "</td>\n            <td>" + item.Assessment + "</td>            \n          </tr>\n        ";
        });
        html += '</table>';
        var listContainer = this.domElement.querySelector('#spListContainer');
        listContainer.innerHTML = html;
    };
    GetSpListItemsWebPart.prototype.render = function () {
        this.domElement.innerHTML = "\n      <div class=\"" + styles.getSpListItems + "\">\n        <div class=\"" + styles.container + "\">\n          <div class=\"ms-Grid-row ms-bgColor-themeDark ms-fontColor-white " + styles.row + "\">\n          <div class=\"ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1\">\n          <span class=\"ms-font-xl ms-fontColor-white\">Welcome to SharePoint Modern Developmennt</span>\n          <p class=\"ms-font-l ms-fontColor-white\">Loading from " + this.context.pageContext.web.title + "</p>\n          <p class=\"ms-font-l ms-fontColor-white\">Retrive Data from SharePoint List</p>\n        </div>\n      </div> \n          <div class=\"ms-Grid-row ms-bgColor-themeDark ms-fontColor-white " + styles.row + "\">\n          <div>List Items</div>\n          <br>\n           <div id=\"spListContainer\" />\n        </div>\n      </div>";
        this._renderListAsync();
    };
    Object.defineProperty(GetSpListItemsWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    GetSpListItemsWebPart.prototype.getPropertyPaneConfiguration = function () {
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
    };
    return GetSpListItemsWebPart;
}(BaseClientSideWebPart));
export default GetSpListItemsWebPart;
//# sourceMappingURL=GetSpListItemsWebPart.js.map