/**
 * Description: Draggable, scrollable and filterable Gantt Chart
 */

const NOT_SCHEDULED = 'Not scheduled',
  SCHEDULED = 'Scheduled';
const colors = {
  Scheduled: '#cc0000',
  Production: '#669900',
  Finished: '#ffbb33',
};

const mLabelWidth = 100,
  margin = {
    top: 40,
    right: 60,
    bottom: 50,
    left: mLabelWidth + 20,
  },
  width = document.body.clientWidth - 17 - margin.right - margin.left,
  height =
    Math.min(630, document.body.clientHeight) - margin.top - margin.bottom,
  yTicksCnt = 8,
  notSchTaskWid = 120,
  tickHeight = height / yTicksCnt;

let xScale, yScale, xAxis, xAxis1, yAxis, svg, gX, gX1, gY, gChart, gTasks,
  gTasksNot, brushX, brushY, gBrushX, gBrushY, modal, modalContent, tip,
  dragTask;
let tasks, machines, machinesById, machineIds, statuses, timeStart, timeEnd;

const formatHour = d3.timeFormat('%I %p'),
  formatDay = d3.timeFormat('%a %d'),
  formatWeek = d3.timeFormat('%b %d'),
  formatMonth = d3.timeFormat('%B'),
  formatYear = d3.timeFormat('%yScale');

// Define filter conditions
const multiFormat = date =>
  (d3.timeDay(date) < date
    ? formatHour
    : d3.timeMonth(date) < date
      ? d3.timeWeek(date) < date
        ? formatDay
        : formatWeek
      : d3.timeYear(date) < date
        ? formatMonth
        : formatYear)(date);

function visualize(data) {
  tasks = data['tasks'];
  machines = data['machines'].sort(d => d.name);
  machinesById = {};
  machines.forEach((m) => {
    machinesById[m.id] = m.name;
  });
  machineIds = machines.map(d => d.id);
  statuses = {};
  data['statuses'].forEach(s => (statuses[s.id] = s.name));

  addFilters(data['statuses']);
  addCanvas();
  addPopups();
  addZoom();
  addAxes();
  addTasks();
  addBrush();
  render();
}

function render() {
  gX.call(xAxis);
  gX1.call(xAxis1).selectAll('text').attr('y', -8);
  gY.call(yAxis);
  gY.selectAll('text')
    .text(d => machinesById[d])
    .attr('transform', 'translate(' + [-mLabelWidth / 2 + 3, 0] + ')');

  updateYTicks();

  gTasks.selectAll('.task').select(function (d) {
    const startDate = new Date(d.start);

    d3.select(this).attr('transform', () => {
      let yVal = yScale(d.machine);

      if (!yVal) {
        yVal =
          (machineIds.indexOf(d.machine) -
            machineIds.indexOf(yScale.domain()[0])) *
          (yScale(yScale.domain()[1]) - yScale(yScale.domain()[0]));
      }

      return 'translate(' + [xAxis.scale()(startDate), yVal + 5] + ')';
    });

    updateTask(d, this);
  });
}

function addFilters(statuses) {
  const filters = d3
    .select('body')
    .append('div')
    .classed('filters', true)
    .selectAll('.filter')
    .data(statuses.filter(d => d.name !== NOT_SCHEDULED))
    .enter()
    .append('label')
    .classed('filter', true);

  filters
    .append('input')
    .attr('type', 'checkbox')
    .attr('id', d => d.id)
    .attr('value', d => d.name)
    .on('click', () => {
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
          .style('display', d =>
            selIds.indexOf(d.status.toString()) === -1 ? 'none' : null,
          );
      }
    });

  filters
    .append('span')
    .style('background-color', d => colors[d.name])
    .text(d => d.name);
}

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

function updateYTicks() {
  gY.selectAll('g.tick').select(function () {
    d3.select(this).selectAll('line').remove();
    d3.select(this).selectAll('path').remove();
    d3.select(this)
      .append('path')
      .attr(
        'd',
        `M0,-${tickHeight / 2 - 1}H-${mLabelWidth}V${tickHeight / 2 + 1}H0`,
      );
  });
}

function addCanvas() {
  svg = d3
    .select('body')
    .append('svg')
    .attr('class', 'ganttChart')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  svg
    .append('defs')
    .append('clipPath')
    .attr('id', 'clip')
    .append('path')
    .attr('d', `M0,0H${width}V${height}H0V0`);

  gChart = svg
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
}

function addZoom() {
  timeEnd = d3.max(tasks, d => d.end);
  timeStart = d3.min(tasks, d => d.start);

  let xEnd = timeEnd;

  if (timeStart + 86400000 < timeEnd) {
    xEnd = timeStart + 86400000;
  }

  let endDate = new Date(timeStart);
  endDate.setMonth(endDate.getMonth() + 1);
  endDate = endDate.getTime() < timeEnd ? endDate.getTime() : timeEnd;

  const zoom = d3
    .zoom()
    .scaleExtent([(xEnd - timeStart) / (endDate - timeStart), 1])
    .on('zoom', function () {
      console.log('zooming');
      const zx = d3.event.transform.rescaleX(xScale);
      let d0 = zx.domain()[0].getTime();
      let d1 = zx.domain()[1].getTime();
      const offset = d1 - d0;

      if (offset > timeEnd - timeStart) {
        zx.domain([timeStart, timeEnd]);
        return;
      } else if (d0 < timeStart) {
        d0 = timeStart;
        d1 = d0 + offset;
      } else if (d1 > timeEnd) {
        d1 = timeEnd;
        d0 = d1 - offset;
      }

      zx.domain([d0, d1]);

      xAxis.scale(zx);
      xAxis1.scale(zx);

      const b0 = (d0 - timeStart) / (timeEnd - timeStart) * width;
      const b1 = (d1 - timeStart) / (timeEnd - timeStart) * width;
      brushX.move(gBrushX, [b0, b1]);

      render();
    });

  gChart
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', width)
    .attr('height', height)
    .attr('fill', '#ffffff')
    .call(zoom);
}

function addAxes() {
  timeEnd = d3.max(tasks, d => d.end);
  timeStart = d3.min(tasks, d => d.start);

  let xEnd = timeEnd;

  if (timeStart + 86400000 < timeEnd) {
    xEnd = timeStart + 86400000;
  }

  xScale = d3.scaleTime().domain([timeStart, xEnd]).range([0, width]);
  yScale = d3
    .scaleBand()
    .domain(machineIds.slice(0, yTicksCnt))
    .range([0, height]);

  xAxis = d3
    .axisBottom(xScale)
    .tickFormat(multiFormat)
    .tickSizeInner(-height)
    .tickSizeOuter(0)
    .tickPadding(8);
  xAxis1 = d3.axisTop(xScale).tickFormat(multiFormat).tickSize(0);
  yAxis = d3.axisLeft().scale(yScale).tickSize(0);

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
}

function addBrush() {
  brushX = d3
    .brushX()
    .extent([
      [0, height + margin.top + 5],
      [width, height + margin.top + 25],
    ])
    .on('brush end', () => {
      const [s0, s1] = d3.event.selection;
      const d0 = new Date(s0 / width * (timeEnd - timeStart) + timeStart);
      const d1 = new Date(s1 / width * (timeEnd - timeStart) + timeStart);

      xAxis.scale().domain([d0, d1]);
      xAxis1.scale().domain([d0, d1]);

      render();
    });

  const gBrushes = gChart.append('g');

  gBrushX = gBrushes
    .append('g')
    .call(brushX)
    .attr('class', 'brush')
    .on('dblclick.brush', null);

  brushX.move(gBrushX, [0, 86400000 / (timeEnd - timeStart) * width]);

  brushY = d3
    .brushY()
    .extent([
      [width + 10, 0],
      [width + 30, height],
    ])
    .on('brush end', () => {
      const [s0, s1] = d3.event.selection;
      const d0 = Math.floor(s0 / height * machineIds.length);
      const d1 = Math.floor(s1 / height * machineIds.length);

      yAxis.scale().domain(machineIds.slice(d0, d1));

      render();
    });

  gBrushY = gBrushes
    .append('g')
    .call(brushY)
    .attr('class', 'brush')
    .on('dblclick.brush', null);

  brushY.move(gBrushY, [0, yTicksCnt / machineIds.length * height]);
}

function addTasks() {
  gTasks = gChart
    .append('g')
    .attr('clip-path', 'url(#clip)')
    .attr('class', 'tasks');

  let dragStart, beforeState, beforeEvent;

  dragTask = d3
    .drag()
    .on('start', function (d) {
      beforeEvent = {x: d3.event.x, y: d3.event.y};
      dragStart = xAxis.scale().invert(d3.event.x).getTime();

      if (statuses[d.status] === NOT_SCHEDULED) {
        const distance = d.end - d.start;

        const trans = d3
          .select(this)
          .attr('transform')
          .replace('translate(', '')
          .replace(')', '')
          .split(',');

        d.start = xAxis.scale().invert(parseFloat(trans[0])).getTime();
        d.end = d.start + distance;
      }

      beforeState = statuses[d.status];
    })
    .on('drag', function (d) {
      const dragX = xAxis.scale().invert(d3.event.x).getTime(),
        dragY = d3.event.y;

      const duration = d.end - d.start;
      d.start += dragX - dragStart;
      d.end = d.start + duration;
      dragStart = dragX;

      d.machine =
        Math.floor(
          dragY / (yScale.range()[1] - yScale.range()[0]) *
          yScale.domain().length,
        ) + yScale.domain()[0];

      let yVal = yScale(d.machine);

      if (typeof yVal !== 'undefined') {
        d3.select(this).attr('transform', () => {
          return 'translate(' + [xAxis.scale()(d.start), yVal + 5] + ')';
        });

        if (statuses[d.status] === NOT_SCHEDULED) {
          for (let id in statuses) {
            if (statuses.hasOwnProperty(id) && statuses[id] === SCHEDULED) {
              d.status = id;
            }
          }

          if ('delay' in d) {
            d3.select(this)
              .append('path')
              .attr('class', 'delay');
          }

          d3.select(this).append(() =>
            d3.select(this).select('path.overlay').node(),
          );

          d3.select(this).select('.overlay').on('click', showModal);
        }
      } else if (statuses[d.status] !== NOT_SCHEDULED) {
        for (let id in statuses) {
          if (statuses.hasOwnProperty(id) && statuses[id] === NOT_SCHEDULED) {
            d.status = id;
          }
        }
      } else {
        d3.select(this).attr('transform', () =>
          'translate(' + [xAxis.scale()(d.start), dragY] + ')',
        );

        d3.select(this).select('path.delay').remove();

        d3.select(this)
          .select('path.bar')
          .attr(
            'class',
            'bar bar-' + statuses[d.status].toLowerCase().replace(' ', '-'),
          );
      }

      updateTask(d, this);
    })
    .on('end', function (d) {
      if (beforeEvent.x === d3.event.x && beforeEvent.y === d3.event.y) {
        showModal(d);
        return;
      }

      if (statuses[d.status] === SCHEDULED && beforeState === NOT_SCHEDULED) {
        gTasks.append(() => d3.select(this).node());
      } else if (statuses[d.status] === NOT_SCHEDULED) {
        gTasksNot.append(() => d3.select(this).node());
      }

      alignNotScheduledTasks();
    });

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

  gTasksNot = gChart.append('g').attr('class', 'tasksNot');

  const heiN = height + margin.top + margin.bottom;

  gTasksNot
    .append('text')
    .text(NOT_SCHEDULED)
    .attr('x', 0)
    .attr('y', heiN)
    .attr('dy', '.5em');

  gTasksNot
    .append('path').classed('tasks-bg', true);

  gTasksNot
    .selectAll('.task')
    .data(tasks.filter(d => statuses[d.status] === NOT_SCHEDULED))
    .enter()
    .append('svg:g')
    .call(dragTask)
    .attr('class', 'task')
    .select(function (d) {
      addTask(d, this);
    });

  alignNotScheduledTasks();
}

const addTask = (d, that) => {
  d3.select(that)
    .append('path')
    .attr(
      'class',
      'bar bar-' + statuses[d.status].toLowerCase().replace(' ', '-'),
    );

  if (statuses[d.status] !== NOT_SCHEDULED) {
    if ('delay' in d) {
      d3.select(that)
        .append('path')
        .attr('class', 'delay');
    }

    if ('progress' in d) {
      d3.select(that)
        .append('path')
        .attr('class', 'progress-bg');

      d3.select(that)
        .append('path')
        .attr('class', 'progress');

      d3.select(that)
        .append('text')
        .classed('percent', true)
        .attr('dy', '.3em')
        .text(d.progress + '%');
    }
  }

  d3.select(that)
    .append('text')
    .classed('title', true)
    .attr('dy', '.5em')
    .text(d.title);

  d3.select(that).append(() => {
    return d3
      .select(that)
      .select('path.bar')
      .clone()
      .attr('class', 'overlay')
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .on('click', showModal)
      .node();
  });

  updateTask(d, that);
};

function updateTask(d, that) {
  let wid = xAxis.scale()(d.end) - xAxis.scale()(d.start);
  let hei = tickHeight - 10;
  let delay = 0;

  if (statuses[d.status] === NOT_SCHEDULED) {
    wid = notSchTaskWid;
  }

  d3.select(that)
    .select('path.bar')
    .attr(
      'class',
      'bar bar-' + statuses[d.status].toLowerCase().replace(' ', '-'),
    )
    .attr('d', `M0 0H${wid}V${hei}H0V0`);

  d3.select(that)
    .select('path.overlay')
    .attr('d', `M0 0H${wid}V${hei}H0V0`);

  if (statuses[d.status] !== NOT_SCHEDULED) {
    if ('delay' in d) {
      delay = ((d.delay * 60000) / (d.end - d.start)) * wid;

      d3.select(that)
        .select('path.delay')
        .attr('d', `M0 0H${delay}V${hei}H0V0`);

      wid -= delay;
    }

    wid -= 20;
    delay += 10;

    if ('progress' in d) {
      hei -= 5;

      const progress = (d.progress / 100) * wid;

      d3.select(that)
        .select('path.progress-bg')
        .classed('small', progress < 40)
        .attr('d', setProgressSize(wid, hei, delay));

      d3.select(that)
        .select('path.progress')
        .classed('small', progress < 40)
        .attr(
          'd',
          `M${delay} ${hei - 15}Q${delay} ${hei - 20},${delay + 5} ${
            hei - 20
          }H${progress + delay}V${hei}H${
            delay + 5
          }Q${delay} ${hei}, ${delay} ${hei - 5}`,
        );

      d3.select(that)
        .select('text.percent')
        .classed('small', progress < 40)
        .attr('x', progress / 2 + delay)
        .attr('y', hei - 10)
        .attr('dy', '.3em');

      hei -= 25;
    }
  }

  d3.select(that)
    .select('text.title')
    .classed('small', wid < 50)
    .attr('x', wid / 2 + delay)
    .attr('y', hei / 2);
}

function alignNotScheduledTasks() {
  const heiN = height + margin.top + margin.bottom;

  gTasksNot.select('path.tasks-bg')
    .attr(
      'd',
      `M0.5,${heiN + 10}H${width}V${heiN + tickHeight + 10}H0.5V${
        heiN + 10
      }`,
    );

  let xPos = 10,
    yPos = heiN + 20;

  gTasksNot
    .selectAll('.task')
    .attr('transform', () => {
      const translate = 'translate(' + [xPos, yPos] + ')';
      xPos += notSchTaskWid + 10;

      svg.attr('height', yPos + tickHeight + 120);

      if (xPos + notSchTaskWid > width - 20) {
        xPos = 10;
        yPos += tickHeight;

        gTasksNot
          .select('path')
          .attr(
            'd',
            `M0.5,${heiN + 10}H${width}V${yPos + tickHeight}H0.5V${
              heiN + 10
            }`,
          );
      }

      return translate;
    })
    .select(function (d) {
      updateTask(d, this);
    });
}

function setProgressSize(wid, hei, delay) {
  return `M${delay} ${hei - 15}Q${delay} ${hei - 20},${delay + 5} ${
    hei - 20
  }H${wid + delay - 5}Q${wid + delay} ${hei - 20},${wid + delay} ${
    hei - 15
  }V${hei - 5}Q${wid + delay} ${hei}, ${wid + delay - 5} ${hei}H${
    delay + 5
  }Q${delay} ${hei}, ${delay} ${hei - 5}`;
}

function addPopups() {
  tip = d3
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

  modal = d3.select('body').append('div').classed('modal', true);
  const modalWrapper = modal.append('div').classed('modal-wrapper', true);
  modalWrapper
    .append('span')
    .classed('close', true)
    .html('&times;')
    .on('click', () => {
      modal.style('display', 'none');
    });
  modalContent = modalWrapper
    .append('div')
    .classed('modal-content', true);
}

function showModal(d) {
  modal.style('display', 'block');
  modalContent.html(
    d.title +
    '<br/>Status: ' +
    statuses[d.status] +
    '<br/>Date: ' +
    getFormattedDate(d.start),
  );
}

d3.json('./assets/data.json').then(data => {
  visualize(data);
});
