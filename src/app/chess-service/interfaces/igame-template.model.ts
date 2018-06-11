export interface IGameTemplateList {
  templates: IGameTemplate[];
}

export interface IGameTemplate {
  name: string;
  type: string;
  rootFolder: string;
  configFiles: {
    boards: string;
    options: string;
    pieces: string;
    players: string
  };
}
