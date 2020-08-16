import { Component, OnInit } from '@angular/core';
import { DataService } from './../data-service.service';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl, FormsModule, Form } from '@angular/forms';
import { Column } from './column-value';
@Component({
  selector: 'app-city-table',
  templateUrl: './city-table.component.html',
  styleUrls: ['./city-table.component.scss']
})
export class CityTableComponent implements OnInit {
  regionCount = 1;
  dataTable: FormGroup;
  sortDirection = 'ASC';
  tableHeading: Array<Column> = [
    {
      id: 'disabled',
      label: 'Disabled'
    },
    {
      id: 'name',
      label: 'Name'
    },
    {
      id: 'position',
      label: 'Latitude/Longitude'
    },
    {
      id: 'volume',
      label: 'Volume'
    }
  ];

  constructor(
    private dataService: DataService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.dataTable = this.fb.group({
      regionTable: this.fb.array([
        this.fb.group({
          region: new FormControl('', Validators.required),
          tableRows: this.fb.array([])
        })
      ])
    });
    this.addCity();
  }

  addCity(event?) {
    if (event) {
      const ctrl = event.get('tableRows') as FormArray;
      ctrl.push(this.initiateCityForm());
    } else {
      const regionControl = this.dataTable.get('regionTable') as FormArray;
      const cityControl = regionControl.controls[this.regionCount - 1].get('tableRows') as FormArray;
      cityControl.push(this.initiateCityForm());
    }
  }

  initiateCityForm(): FormGroup {
    return this.fb.group({
      disabled: new FormControl(false),
      name: new FormControl('', Validators.required),
      latitude: new FormControl(0, Validators.required),
      longitude: new FormControl(0, Validators.required),
      volume: new FormControl('', Validators.required)
    });
  }

  get regionFormControls() {
    const dataControl = this.dataTable.get('regionTable') as FormArray;
    return dataControl;
  }

  addTable() {
    const dataFormControl = this.dataTable.get('regionTable') as FormArray;
    this.regionCount++;
    dataFormControl.push(this.patchValue());
    this.addCity();
  }

  patchValue() {
    return this.fb.group({
      region: '',
      tableRows: this.fb.array([])
    });
  }

  get checkidx() {
    return false;
  }

  deleteCity(event, val) {
    const control = event.get('tableRows') as FormArray;
    for (const item of control.value) {
      const idx = control.value.findIndex(row => (row === item && item.disabled));
      if (idx > -1) {
        control.removeAt(idx);
      }
    }
  }

  updateMap() {
    let data = [];
    const regionControl = this.dataTable.get('regionTable') as FormArray;
    for (const cityControl of regionControl.controls) {
      data = [...data, ...cityControl.value.tableRows];
    }
    this.updateGoogleMap(data);
  }

  updateGoogleMap(rows) {
    this.dataService.emitValueForRootLoader(rows);
  }
}
