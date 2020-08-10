/**
 * Description: Draggable, scrollable and filterable Gantt Chart
 */

const yTicksCnt = 8;
const tickWidth = 70;
const mLabelWidth = 100;
const notSchTaskWid = 120;
const NOT_SCHEDULED = 'Not scheduled';
const SCHEDULED = 'Scheduled';
const margin = {
  top: 40,
  right: 60,
  bottom: 60,
  left: mLabelWidth + 20,
};
let width = document.body.clientWidth - 17 - margin.right - margin.left;
let height = 640 - margin.top - margin.bottom;
let x, y, xAxis, xAxis1, yAxis, gX, gX1, gY;

const formatMillisecond = d3.timeFormat('.%L'),
  formatSecond = d3.timeFormat(':%S'),
  formatMinute = d3.timeFormat('%I:%M'),
  formatHour = d3.timeFormat('%I %p'),
  formatDay = d3.timeFormat('%a %d'),
  formatWeek = d3.timeFormat('%b %d'),
  formatMonth = d3.timeFormat('%B'),
  formatYear = d3.timeFormat('%Y');

// Define filter conditions
const multiFormat = date =>
  (d3.timeSecond(date) < date
    ? formatMillisecond
    : d3.timeMinute(date) < date
    ? formatSecond
    : d3.timeHour(date) < date
    ? formatMinute
    : d3.timeDay(date) < date
    ? formatHour
    : d3.timeMonth(date) < date
    ? d3.timeWeek(date) < date
      ? formatDay
      : formatWeek
    : d3.timeYear(date) < date
    ? formatMonth
    : formatYear)(date);

const keyFunction = d => d.start + d.title + d.end;
const rectTransform = d =>
  'translate(' + x(new Date(d.start * 1000)) + ',' + y(d.machine) + ')';

d3.json('./assets/data.json').then(data => {
  const tasks = data.tasks;
  const machines = data.machines.sort(d => d.name);
  const machinesById = {};
  machines.forEach((m, i) => {
    machinesById[m.id] = m.name;
  });
  const machineIds = machines.map(d => d.id);
  const statuses = {};
  data.statuses.forEach(s => (statuses[s.id] = s.name));

  const colors = {
    Scheduled: '#cc0000',
    Production: '#669900',
    Finished: '#ffbb33',
  };

  const filters = d3
    .select('body')
    .append('div')
    .classed('filters', true)
    .selectAll('.filter')
    .data(data.statuses.filter(d => d.name !== NOT_SCHEDULED))
    .enter()
    .append('label')
    .classed('filter', true);

  filters
    .append('input')
    .attr('type', 'checkbox')
    .attr('id', d => d.id)
    .attr('value', d => d.name)
    .on('click', d => {
      const selIds = [];
      const checked = document.querySelectorAll('.filters input:checked');

      checked.forEach(c => {
        selIds.push(c.getAttribute('id'));
      });

      if (!selIds.length) {
        gTasks.selectAll('.task').style('display', null);
      } else {
        gTasks
          .selectAll('.task')
          .filter(d => selIds.indexOf(d.status.toString()) == '-1')
          .style('display', 'none');
      }
    });

  filters
    .append('span')
    .style('background-color', d => colors[d.name])
    .text(d => d.name);

  const tickHeight = height / yTicksCnt;

  const svg = d3
    .select('body')
    .append('svg')
    .attr('class', 'ganttChart')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top);

  svg
    .append('defs')
    .append('clipPath')
    .attr('id', 'clip')
    .append('path')
    .attr('d', `M0,0H${width}V${height}H0V0`);

  const gChart = svg
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

  const timeEnd = d3.max(tasks, d => d.end);
  const timeStart = d3.min(tasks, d => d.start);

  let xEnd = timeEnd;

  if (timeStart + (width / tickWidth) * 3600000 < timeEnd) {
    xEnd = timeStart + (width / tickWidth) * 3600000;
  }

  const subDistance = xEnd - timeStart;

  xDateEnd = new Date(xEnd);
  xDateStart = new Date(timeStart);

  x = d3.scaleTime().domain([xDateStart, xDateEnd]).range([0, width]);
  y = d3.scaleBand().domain(machineIds.slice(0, yTicksCnt)).range([0, height]);

  xAxis = d3
    .axisBottom(x)
    .tickFormat(multiFormat)
    .tickSizeInner(-height)
    .tickSizeOuter(0)
    .tickPadding(8)
    .ticks(d3.timeHour, 1);
  xAxis1 = d3
    .axisTop(x)
    .tickFormat(multiFormat)
    .tickSize(0)
    .ticks(d3.timeHour, 1);
  yAxis = d3.axisLeft().scale(y).tickSize(0);

  const axes = gChart.append('g').classed('axes', true);

  gX = axes
    .append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0, ' + height + ')');
  gX1 = axes.append('g').attr('class', 'x axis');
  gY = axes.append('g').attr('class', 'y axis');
  gY.append('path')
    .attr('d', 'M0,0.5V' + height)
    .attr('transform', 'translate(' + [width, 0] + ')');
  const gSliders = gChart.append('g').classed('sliders', true);

  const xSlider = d3
    .sliderBottom()
    .min(new Date(timeStart))
    .max(new Date(timeEnd - (width / tickWidth - 1) * 3600000))
    .width(width - 24)
    .step(3600000)
    .default(new Date(timeStart))
    .on('onchange', val => {
      x.domain([val, new Date(val.getTime() + subDistance)]);
      render();
    });

  const gSliderX = gSliders
    .append('g')
    .attr('transform', 'translate(' + [12, height + 40] + ')');

  gSliderX.call(xSlider).selectAll('.axis').remove();
  gSliderX.selectAll('.parameter-value text').remove();

  const ySlider = d3
    .sliderRight()
    .min(0)
    .max(machines.length - yTicksCnt)
    .height(-height)
    .step(1)
    .default(0)
    .on('onchange', val => {
      y.domain(machineIds.slice(val, val + yTicksCnt));
      render();
    });

  const gSliderY = gSliders
    .append('g')
    .attr('transform', 'translate(' + [width + 20, height] + ')');

  gSliderY.call(ySlider).selectAll('.axis').remove();
  gSliderY.selectAll('.parameter-value text').remove();

  const gTasks = gChart
    .append('g')
    .attr('clip-path', 'url(#clip)')
    .attr('class', 'tasks');

  let dragStart, beforeState, beforeEvent;
  const dragTask = d3
    .drag()
    .on('start', function (d) {
      beforeEvent = { x: d3.event.x, y: d3.event.y };
      dragStart = x.invert(d3.event.x).getTime();

      if (statuses[d.status] == NOT_SCHEDULED) {
        const distance = d.end - d.start;

        const trans = d3
          .select(this)
          .attr('transform')
          .replace('translate(', '')
          .replace(')', '')
          .split(',');

        d.start = x.invert(parseFloat(trans[0])).getTime();
        d.end = d.start + distance;
      }

      beforeState = statuses[d.status];
    })
    .on('drag', function (d) {
      const dragX = x.invert(d3.event.x).getTime(),
        dragY = d3.event.y;

      const duration = d.end - d.start;
      d.start += dragX - dragStart;
      d.end = d.start + duration;
      dragStart = dragX;

      d.machine =
        Math.floor(
          (dragY / (y.range()[1] - y.range()[0])) * y.domain().length,
        ) + y.domain()[0];

      let yVal = y(d.machine);

      if (typeof yVal !== 'undefined') {
        d3.select(this).attr('transform', () => {
          return 'translate(' + [x(new Date(d.start)), yVal + 5] + ')';
        });

        if (statuses[d.status] == NOT_SCHEDULED) {
          for (let id in statuses) {
            if (statuses[id] === SCHEDULED) {
              d.status = id;
            }
          }

          let wid = x(d.end) - x(d.start);
          let hei = tickHeight - 10;
          let delay = 0;

          d3.select(this)
            .select('path:nth-child(1)')
            .attr(
              'class',
              'bar-' + statuses[d.status].toLowerCase().replace(' ', '-'),
            )
            .attr(
              'd',
              `M0 15Q0 0,15 0H${wid - 15}Q${wid} 0,${wid} 15V${
                hei - 15
              }Q${wid} ${hei}, ${wid - 15} ${hei}H15Q0 ${hei}, 0 ${
                hei - 15
              }V15`,
            );

          d3.select(this)
            .select('path.overlay')
            .attr(
              'd',
              `M0 15Q0 0,15 0H${wid - 15}Q${wid} 0,${wid} 15V${
                hei - 15
              }Q${wid} ${hei}, ${wid - 15} ${hei}H15Q0 ${hei}, 0 ${
                hei - 15
              }V15`,
            );

          if ('delay' in d) {
            delay = (d.delay / 60) * tickWidth;

            d3.select(this)
              .append('path')
              .attr(
                'd',
                `M0 15Q0 0,15 0H${delay}V${hei}H15Q0 ${hei}, 0 ${hei - 15}`,
              )
              .attr('class', 'delay');

            wid -= delay;
          }

          wid -= 20;
          delay += 10;

          d3.select(this)
            .select('text')
            .attr('x', wid / 2 + delay)
            .attr('y', hei / 2);

          d3.select(this).append(() =>
            d3.select(this).select('path.overlay').node(),
          );

          d3.select(this).select('.overlay').on('click', showModal);
        }
      } else if (statuses[d.status] !== NOT_SCHEDULED) {
        for (let id in statuses) {
          if (statuses[id] === NOT_SCHEDULED) {
            d.status = id;
          }
        }
      } else {
        d3.select(this).attr('transform', () => {
          return 'translate(' + [x(new Date(d.start)), dragY] + ')';
        });

        let wid = notSchTaskWid;
        let hei = tickHeight - 10;

        d3.select(this).select('path.delay').remove();

        d3.select(this)
          .select('path:nth-child(1)')
          .attr(
            'class',
            'bar-' + statuses[d.status].toLowerCase().replace(' ', '-'),
          )
          .attr(
            'd',
            `M0 15Q0 0,15 0H${wid - 15}Q${wid} 0,${wid} 15V${
              hei - 15
            }Q${wid} ${hei}, ${wid - 15} ${hei}H15Q0 ${hei}, 0 ${hei - 15}V15`,
          );

        d3.select(this)
          .select('path.overlay')
          .attr(
            'd',
            `M0 15Q0 0,15 0H${wid - 15}Q${wid} 0,${wid} 15V${
              hei - 15
            }Q${wid} ${hei}, ${wid - 15} ${hei}H15Q0 ${hei}, 0 ${hei - 15}V15`,
          );

        d3.select(this)
          .select('text')
          .attr('x', wid / 2)
          .attr('y', hei / 2);
      }
    })
    .on('end', function (d) {
      if (beforeEvent.x == d3.event.x && beforeEvent.y == d3.event.y) {
        showModal(d);
        return;
      }

      if (statuses[d.status] == SCHEDULED && beforeState == NOT_SCHEDULED) {
        gTasks.append(() => d3.select(this).node());
      } else if (statuses[d.status] == NOT_SCHEDULED) {
        gTasksNot.append(() => d3.select(this).node());
      }

      let xPos = 10,
        yPos = height + 100;

      gTasksNot.selectAll('g.task').attr('transform', d => {
        const tranlate = 'translate(' + [xPos, yPos] + ')';
        xPos += notSchTaskWid + 10;

        if (xPos + notSchTaskWid > width - 20) {
          xPos = 10;
          yPos += tickHeight;

          svg.attr('height', yPos + tickHeight + 120);

          gTasksNot
            .select('path')
            .attr(
              'd',
              `M0.5,${height + 90}H${width}V${yPos + tickHeight}H0.5V${
                height + 90
              }`,
            );
        }

        return tranlate;
      });
    });

  const tip = d3
    .tip()
    .attr('class', 'tooltip')
    .html(d => {
      return (
        d.title +
        '<br/>Status: ' +
        statuses[d.status] +
        '<br/>Date: ' +
        getFormattedDate(d.start)
      );
    });

  svg.call(tip);

  const modal = d3.select('body').append('div').classed('modal', true);
  const modalWrapper = modal.append('div').classed('modal-wrapper', true);
  modalWrapper
    .append('span')
    .classed('close', true)
    .html('&times;')
    .on('click', () => {
      modal.style('display', 'none');
    });
  const modalContent = modalWrapper
    .append('div')
    .classed('modal-content', true);

  const showModal = d => {
    modal.style('display', 'block');
    modalContent.html(
      d.title +
        '<br/>Status: ' +
        statuses[d.status] +
        '<br/>Date: ' +
        getFormattedDate(d.start),
    );
  };

  const addTask = (d, that) => {
    const startDate = new Date(d.start);
    const endDate = new Date(d.end);
    let wid = x(endDate) - x(startDate);
    let hei = tickHeight - 10;
    let delay = 0;

    if (statuses[d.status] === NOT_SCHEDULED) {
      wid = notSchTaskWid;
    }

    d3.select(that)
      .append('path')
      .attr(
        'class',
        'bar-' + statuses[d.status].toLowerCase().replace(' ', '-'),
      )
      .attr(
        'd',
        `M0 15Q0 0,15 0H${wid - 15}Q${wid} 0,${wid} 15V${
          hei - 15
        }Q${wid} ${hei}, ${wid - 15} ${hei}H15Q0 ${hei}, 0 ${hei - 15}V15`,
      );

    if (statuses[d.status] !== NOT_SCHEDULED) {
      if ('delay' in d) {
        delay = (d.delay / 60) * tickWidth;

        d3.select(that)
          .append('path')
          .attr(
            'd',
            `M0 15Q0 0,15 0H${delay}V${hei}H15Q0 ${hei}, 0 ${hei - 15}`,
          )
          .attr('class', 'delay');

        wid -= delay;
      }

      wid -= 20;
      delay += 10;

      if ('progress' in d) {
        hei -= 5;

        d3.select(that)
          .append('path')
          .attr('class', 'progress-bg')
          .attr(
            'd',
            `M${delay} ${hei - 15}Q${delay} ${hei - 20},${delay + 5} ${
              hei - 20
            }H${wid + delay - 5}Q${wid + delay} ${hei - 20},${wid + delay} ${
              hei - 15
            }V${hei - 5}Q${wid + delay} ${hei}, ${wid + delay - 5} ${hei}H${
              delay + 5
            }Q${delay} ${hei}, ${delay} ${hei - 5}`,
          );

        const progress = (d.progress / 100) * wid;

        d3.select(that)
          .append('path')
          .attr('class', 'progress')
          .attr(
            'd',
            `M${delay} ${hei - 15}Q${delay} ${hei - 20},${delay + 5} ${
              hei - 20
            }H${progress + delay}V${hei}H${
              delay + 5
            }Q${delay} ${hei}, ${delay} ${hei - 5}`,
          );

        hei -= 25;
      }
    }

    d3.select(that)
      .append('text')
      .attr('x', wid / 2 + delay)
      .attr('y', hei / 2)
      .attr('dy', '.5em')
      .text(d.title);

    d3.select(that).append(() => {
      return d3
        .select(that)
        .select('path:first-child')
        .clone()
        .attr('class', 'overlay')
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        .on('click', showModal)
        .node();
    });
  };

  gTasks
    .selectAll('.task')
    .data(tasks.filter(d => statuses[d.status] !== NOT_SCHEDULED))
    .enter()
    .append('svg:g')
    .call(dragTask)
    .attr('class', 'task')
    .select(function (d) {
      addTask(d, this);
    });

  const gTasksNot = gChart.append('g').attr('class', 'tasksNot');

  gTasksNot
    .append('text')
    .text(NOT_SCHEDULED)
    .attr('x', 0)
    .attr('y', height + 68)
    .attr('dy', '.5em');

  gTasksNot
    .append('path')
    .attr(
      'd',
      `M0.5,${height + 90}H${width}V${height + tickHeight + 100}H0.5V${
        height + 90
      }`,
    );

  let xPos = 10,
    yPos = height + 100;

  gTasksNot
    .selectAll('.task')
    .data(tasks.filter(d => statuses[d.status] === NOT_SCHEDULED))
    .enter()
    .append('svg:g')
    .call(dragTask)
    .attr('class', 'task')
    .attr('transform', d => {
      const tranlate = 'translate(' + [xPos, yPos] + ')';
      xPos += notSchTaskWid + 10;

      svg.attr('height', yPos + tickHeight + 120);

      if (xPos + notSchTaskWid > width - 20) {
        xPos = 10;
        yPos += tickHeight;

        gTasksNot
          .select('path')
          .attr(
            'd',
            `M0.5,${height + 90}H${width}V${yPos + tickHeight}H0.5V${
              height + 90
            }`,
          );
      }

      return tranlate;
    })
    .select(function (d) {
      addTask(d, this);
    });

  const render = function () {
    gX.call(xAxis);
    gX1.call(xAxis1).selectAll('text').attr('y', -8);
    gY.call(yAxis);
    gY.selectAll('text')
      .text(d => machinesById[d])
      .attr('transform', 'translate(' + [-mLabelWidth / 2 + 3, 0] + ')');

    gY.selectAll('g.tick').select(function (d) {
      d3.select(this).selectAll('line').remove();
      d3.select(this).selectAll('path').remove();
      d3.select(this)
        .append('path')
        .attr(
          'd',
          `M0,-${tickHeight / 2 - 1}H-${mLabelWidth}V${tickHeight / 2 + 1}H0`,
        );
    });

    gTasks.selectAll('.task').attr('transform', d => {
      let yVal = y(d.machine);

      if (!yVal) {
        yVal =
          (machineIds.indexOf(d.machine) - machineIds.indexOf(y.domain()[0])) *
          (y(y.domain()[1]) - y(y.domain()[0]));
      }

      return 'translate(' + [x(new Date(d.start)), yVal + 5] + ')';
    });
  };

  render();
});

function getFormattedDate(d) {
  const date = new Date(d);

  let hour = date.getHours();
  let minute = date.getMinutes() + '';
  const p = hour >= 12 ? 'PM' : 'AM';
  hour = (hour % 12) + '';
  hour = '00'.substr(hour.length) + hour;
  minute = '00'.substr(minute.length) + minute;
  const day = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ][date.getDay()];
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ][date.getMonth()];
  const dat = date.getDate();
  const year = date.getFullYear();

  return (
    hour +
    ':' +
    minute +
    ' ' +
    p +
    ' ' +
    day +
    ', ' +
    month +
    ' ' +
    dat +
    ', ' +
    year
  );
}
