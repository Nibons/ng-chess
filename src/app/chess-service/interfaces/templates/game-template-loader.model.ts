export interface IGameTemplateLoader {
  name: string;
  type: ['template', 'save'];
  rootFolder: string;
  configFiles: {
    boards: string,
    options: string,
    pieces: string,
    players: string
  };
}
