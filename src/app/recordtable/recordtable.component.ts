import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { txns } from '../bank';

@Component({
  selector: 'app-recordtable',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './recordtable.component.html',
  styleUrl: './recordtable.component.css'
})
export class RecordtableComponent implements OnInit {
 
selectedDate?: string;
  msg: string = '';

  transactions: any[] = [];
  filteredTransactions: any[] = [];

  ngOnInit(): void {
    this.transactions = txns;
    this.filteredTransactions = [...this.transactions];
  }

  filterByDate() {
    this.msg = ''; // reset message

    if (!this.selectedDate) {
      this.msg = "Please select a date";
      this.filteredTransactions = [];
      return;
    }

    
    const d = new Date(this.selectedDate);
    const formattedDate =
      d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');

    this.filteredTransactions = this.transactions.filter(
      (txn: any) => txn.date === formattedDate
    );

  
    if (this.filteredTransactions.length === 0) {
      this.msg = "No transactions found";
    }
  }

  sortByAmount() {
    this.filteredTransactions = [...this.filteredTransactions].sort(
      (a, b) => a.amount - b.amount
    );
  }



}
