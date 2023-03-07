export class Projects {
    id?: number;
    title: string;
    subtitle: string;
    description: string;
    imgProject: string;
    linkProject: string;

    constructor(title: string, subtitle: string, description: string, imgProject: string, linkProject: string) {
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
        this.imgProject = imgProject;
        this.linkProject = linkProject;
    }
}
