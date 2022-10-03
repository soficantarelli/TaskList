import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Task } from '../../Task';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  text: string = '';
  day: string = '';
  reminder: boolean = false;
  showAddTask: boolean = false;
  subscription?: Subscription;

  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  constructor(
    private uiService: UiService
  ) { 
    this.subscription = this.uiService.onToggle().subscribe(value => this.showAddTask = value);
  }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.text.length === 0) {
      alert('Please enter a text');
      return;
    }

    /*const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    }*/

    const {text, day, reminder} = this;
    const newTask = {text, day, reminder};

    this.onAddTask.emit(newTask);
  }

}
