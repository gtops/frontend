import React from "react";
import {Tabs} from "../../../../../../components/tabs";
import {OrgForm} from "../org-form/OrgForm";
import {autobind} from "core-decorators";
import {OrgsList} from "../orgs-list";

@autobind
export class Organisations extends React.Component {
    render(): React.ReactNode {
        return (
            <Tabs
                tabs={[
                    {name: "Добавить организацию", component: <OrgForm isEditForm={false}/>, isActive: true},
                    {name: "Редактировать организацию", component: <OrgForm isEditForm={true}/>},
                    {name: "Посмотреть все организации", component: <OrgsList/>},
                ]}
                isMain={false}
                classNameHeading = "-links"
            />
        )
    }
}