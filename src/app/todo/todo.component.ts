import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  taskListArray: any [] = [];
  constructor(private toDoService: TodoService) { }

  ngOnInit() {
    this.toDoService.getTaskList().snapshotChanges().
    subscribe(item => {
      item.forEach(element => {
        var x = element.payload.toJSON();
        x["key"] = element.key;
        this.taskListArray.push(x);
      });

      this.taskListArray.sort((a, b) => {
        return a.isChecked - b.isChecked;
      })
    });
  }
  onAdd(task) {
    this.toDoService.addTask(task.value);
    task.value = null;
  }
}
