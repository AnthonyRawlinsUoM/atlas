import { Component, OnInit } from '@angular/core';
import { SuiModal, ComponentModalConfig, ModalSize } from "ng2-semantic-ui"

interface IConfirmModalContext {
  title: string;
  question: string;
}

@Component({
  selector: 'modal-confirm',
  templateUrl: './modal-confirm.component.html'
})
export class ModalConfirmComponent {
  constructor(public modal: SuiModal<IConfirmModalContext, void, void>) { }
}

export class ConfirmModal extends ComponentModalConfig<IConfirmModalContext, void, void> {
  constructor(title: string, question: string, size = ModalSize.Small) {
    super(ModalConfirmComponent, { title, question });

    this.isClosable = false;
    this.transitionDuration = 200;
    this.size = size;
  }
}