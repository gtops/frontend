import React from "react";
import {Tabs} from "../../../../../../components/tabs";
import {OrgForm} from "../org-form/OrgForm";
import {autobind} from "core-decorators";
import {OrgsList} from "../orgs-list";
import {AddAdminForm} from "../admin-form";

@autobind
export class Organisations extends React.Component {
    render(): React.ReactNode {
        return (
            <Tabs
                tabs={[
                    {name: "Все организации", component: <OrgsList/>, isActive: true},
                    {name: "Добавить организацию", component: <OrgForm isEditForm={false}/>},
                    {name: "Редактировать организацию", component: <OrgForm isEditForm={true}/>},
                    {name: "Пригласить администратора", component: <AddAdminForm/>},
                ]}
                isMain={false}
                classNameHeading = "-links"
            />
        )
    }
}