import { Component, OnInit } from '@angular/core';
import { ApexOptions, ApexXAxis } from 'ng-apexcharts';
import { TurnService } from 'src/app/service/turnos.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  chartOptions: Partial<ApexOptions> = {};
  barChartData: { name: string, data: number[] }[] = [];
  barbers: string[] = [];
  turnCounts: number[] = [];
  services: string[] = [];
  serviceCounts: number[] = [];
  xAxisOptions: Partial<ApexXAxis> = {
    categories: []
  };

  months = [
    { name: 'Enero', value: '01' },
    { name: 'Febrero', value: '02' },
    { name: 'Marzo', value: '03' },
    { name: 'Abril', value: '04' },
    { name: 'Mayo', value: '05' },
    { name: 'Junio', value: '06' },
    { name: 'Julio', value: '07' },
    { name: 'Agosto', value: '08' },
    { name: 'Septiembre', value: '09' },
    { name: 'Octubre', value: '10' },
    { name: 'Noviembre', value: '11' },
    { name: 'Diciembre', value: '12' }
  ];

  constructor(private turnService: TurnService) { }

  ngOnInit(): void {
    this.loadBarberChartData();
    this.loadServiceChartData();
    this.loadTurnsByDayChartData();
  }

  loadBarberChartData(): void {
    this.turnService.getTurnData().subscribe(data => {
      const barberMap = new Map<string, number>();
      data.forEach(turn => {
        if (turn.barbero) {
          barberMap.set(turn.barbero, (barberMap.get(turn.barbero) || 0) + 1);
        }
      });

      this.barbers = Array.from(barberMap.keys());
      this.turnCounts = Array.from(barberMap.values());
      this.barChartData = [{
        name: 'Cortes',
        data: this.turnCounts
      }];
      this.chartOptions = {
        series: this.turnCounts,
        chart: {
          type: 'pie',
          height: 350
        },
        labels: this.barbers,
        title: {
          text: 'Cantidad de cortes por barbero',
          align: 'center',
          margin: 10,
          style: {
            fontSize: '16px'
          }
        }
      };
    });
  }

  loadServiceChartData(): void {
    this.turnService.getTurnData().subscribe(data => {
      const serviceMap = new Map<string, number>();
      data.forEach(turn => {
        if (turn.servicio) {
          serviceMap.set(turn.servicio, (serviceMap.get(turn.servicio) || 0) + 1);
        }
      });

      this.services = Array.from(serviceMap.keys());
      this.serviceCounts = Array.from(serviceMap.values());
    });
  }

  loadTurnsByDayChartData(): void {
    this.turnService.getTurnData().subscribe(data => {
      const turnCountsByDay = new Map<string, number>();
      data.forEach(turn => {
        const date = new Date(turn.fecha);
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Zero pad month
        const key = `${month}/${date.getDate().toString()}`;
        turnCountsByDay.set(key, (turnCountsByDay.get(key) || 0) + 1);
      });

      // Sort the map by keys (dates)
      const sortedTurnCountsByDay = new Map([...turnCountsByDay.entries()].sort());

      this.xAxisOptions = {
        categories: Array.from(sortedTurnCountsByDay.keys()) as string[]
      };
      this.turnCounts = Array.from(sortedTurnCountsByDay.values());
    });
  }

  onMonthChange(event: any): void {
    const selectedMonth = event.target.value;
    this.turnService.getTurnData().subscribe(data => {
      const turnCountsByDay = new Map<string, number>();
      data.forEach(turn => {
        const date = new Date(turn.fecha);
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Zero pad month
        const key = `${month}/${date.getDate().toString()}`;
        if (month === selectedMonth) {
          turnCountsByDay.set(key, (turnCountsByDay.get(key) || 0) + 1);
        }
      });

      // Sort the map by keys (dates)
      const sortedTurnCountsByDay = new Map([...turnCountsByDay.entries()].sort());

      this.xAxisOptions = {
        categories: Array.from(sortedTurnCountsByDay.keys()) as string[]
      };
      this.turnCounts = Array.from(sortedTurnCountsByDay.values());
    });
  }
}
