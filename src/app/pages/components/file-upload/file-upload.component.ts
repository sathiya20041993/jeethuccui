import { MessageService } from 'primeng/components/common/messageservice';

import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
export const ELEMENT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Html5UploadComponent),
    multi: true
};
@Component({
    selector: 'app-upload',
    template: `
    <style>
    .inputfile {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
    }
    
    .inputfile+label>.chooseBtn {
        color: black;
        background-color: #F9F9F9;
        border: 1px solid #DDDDDD;
        display: inline-block;
        cursor: pointer;
        font-weight: normal;
        padding: 2px 12px;
        margin-top: 5px;
        border-radius: 3px;
    }
    
    .inputfile:focus+label>.chooseBtn,
    .inputfile+label>.chooseBtn:hover {
        color: white;
        background-color: #286090 !important;
        border-color: #286090 !important;
    }
    
    .inputfile:focus+label>.chooseBtn {
        outline: 1px dotted #286090;
        outline: -webkit-focus-ring-color auto 5px;
    }
    
    .inputfile+label>.chooseBtn * {
        pointer-events: none;
    }
</style>
    <input #fileInput type="file" [attr.id]="elmId" [attr.name]="elmId" 
        [attr.accept]="acceptedExt ? acceptedExt : null" 
        [attr.multiple]="multiple ? '' : null"
        class="inputfile" (change)="fileChanged($event); getFile()" (blur)="onInputBlur($event)" />
    <label [attr.for]="elmId">
        <span class="chooseBtn"><i class="fa fa-cloud-upload"></i> Browse</span>
        <span *ngIf="fileSelected.length > 0">
            <span *ngFor="let file of fileSelected; let i = index;"> {{file.name}}
                <span *ngIf="i != fileSelected.length-1">,</span>
            </span>
        </span>
        <span *ngIf="fileSelected.length == 0">No File Selected</span>
    </label>
    `,
    providers: [ELEMENT_VALUE_ACCESSOR]
})
export class Html5UploadComponent implements OnInit, ControlValueAccessor {
    @ViewChild('fileInput') myFileInput: ElementRef;
    @Input() elmId = 'file';
    @Input() multiple;
    @Input() acceptedExt = '.Zip';
    @Input() maxSizeinMB = 40;
    @Input() fileNameMaxLength = 50;
    private innerValue: any;
    fileSelected = [];
    one_MB_in_Bytes = 1048576;
    @Output() fileChange = new EventEmitter();
    @Output() selectedFiles = new EventEmitter();
    onModelChange: Function = () => { };
    onModelTouched: Function = () => { };
    fileName_length_error_message = '"%fileName%" file\'s name is greater than %fileNameMaxLength%. Please rename the file and select again.';
    file_max_size_error_message = '"%fileName%" file\'s size is greater than %maxSizeinMB%MB. Please select file less than %maxSizeinMB%MB.';
    constructor(private _messageService: MessageService) { }
    ngOnInit() { }
    get value(): any {
        return this.innerValue;
    };
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onModelChange(v);
        }
    }
    writeValue(value: any): void {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }
    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }
    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }
    /**
     * Method to get files
     */
    getFile() {
        return this.selectedFiles.emit(this.myFileInput.nativeElement.files);
    }
    fileChanged(event) {
        if (event.target.files.length > 0) {
            this.fileSelected = [];
            for (let index = 0; index < event.target.files.length; index++) {
                let file: File = event.target.files[index];
                let myReader: FileReader = new FileReader();
                myReader.onloadend = (e) => {
                    if (event.target.files[index].size <= this.maxSizeinMB * this.one_MB_in_Bytes
                        && event.target.files[index].name.length <= 50) {
                        this.fileSelected.push({
                            'name': event.target.files[index].name,
                            'size': event.target.files[index].size,
                            'type': event.target.files[index].type,
                            'lastModified': event.target.files[index].lastModified,
                            'base64': myReader.result
                        });
                    }
                    if (event.target.files[index].name.length > 50) {
                        let replacements = {
                            '%fileName%': event.target.files[index].name,
                            '%fileNameMaxLength%': this.fileNameMaxLength
                        };
                        this.fileName_length_error_message = this.fileName_length_error_message
                            .replace(
                            /%\w+%/g, function (matchCode) {
                                return replacements[matchCode] || '';
                            }
                            );
                            alert("File Name Length Error")
                       // this._messageService.showMessage("Error", this.fileName_length_error_message);
                    }
                    if (event.target.files[index].size > this.maxSizeinMB * this.one_MB_in_Bytes) {
                        let replacements = {
                            '%fileName%': event.target.files[index].name,
                            '%maxSizeinMB%': this.maxSizeinMB
                        };
                        this.file_max_size_error_message = this.file_max_size_error_message.replace(
                            /%\w+%/g, function (matchCode) {
                                return replacements[matchCode] || '';
                            }
                        );
                        alert("File Name Length Error")
                        // this._messageService.showMessage(Error, this.file_max_size_error_message);
                    }
                };
                myReader.onerror = function (error) {
                    console.error('Error: ', error);
                };
                myReader.readAsDataURL(file);
            }
        }
        this.value = this.fileSelected;
        return this.fileChange.emit(this.fileSelected);
    }
    onInputBlur(event) {
        this.onModelTouched();
    }
}
