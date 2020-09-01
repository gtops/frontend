import React from "react";
import {Tabs} from "../../../../components/tabs";
import {autobind} from "core-decorators";
import {SecretaryCatalog} from "./components/secretary-catalog";
import {SportObjectCatalog} from "./components/sport-object-catalog";
import {JudgeCatalog} from "./components/judge-catalog";

@autobind
export class Catalogs extends React.Component {

    render(): React.ReactNode {
        return (
            <Tabs
                tabs={[
                    {name: "Секретари", isActive: true, component: <SecretaryCatalog/>},
                    {name: "Судьи", component: <JudgeCatalog/>},
                    {name: "Спортивные объекты", component: <SportObjectCatalog/>}
                ]}
                classNameHeading="-links"
            />
        )
    }
}