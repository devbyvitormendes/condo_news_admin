export class DashboardModel {
    items: DashboardItemModel[] = [];

    constructor(items: DashboardItemModel[]) {
        this.items = items;
    }

    static constructorEmpty(): DashboardModel {
        return new DashboardModel([]);
    }
}

export class DashboardItemModel {
    title: string;
    value: string;

    constructor(title: string, value: string) {
        this.title = title;
        this.value = value;
    }

    static constructorEmpty(): DashboardItemModel {
        return new DashboardItemModel('', '');
    }
}