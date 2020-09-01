import React from "react";
import {autobind} from "core-decorators";
import {BreadcrumbsStore} from "./BreadcrumbsStore";
import {IBreadcrumbsProps} from "./IBreadcrumbsProps";

@autobind
export class Breadcrumbs extends React.Component<IBreadcrumbsProps> {
    private readonly store = new BreadcrumbsStore();

    render(): React.ReactNode {
        return (
            this.store.items.map(item => {
                return <a key={Math.random()} href={item.link}>{item.title}</a>
            })
        )
    }
}