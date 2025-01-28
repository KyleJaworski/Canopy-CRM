export enum PopupAction {
  Delete = 'Delete',
  Deactivate = 'Deactivate',
  Reactivate = 'Reactivate',
}

export interface PopupWarning {
  heading: string;
  body: string;
  action: PopupAction;
}
