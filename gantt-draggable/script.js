/**
 * Description: Draggable, scrollable and filterable Gantt Chart
 */
let yTicksCnt = 3, // number of machines to show on graph. Please change it
  zoomLevel = 1, // default zoom level: 1 day
  textMinWid = 60; // hide text under this width

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
  notSchTaskWid = 120;

let timeOffset = 86400000, // 1 day duration in milliseconds
  tickHeight = height / yTicksCnt;

let xScale,
  yScale,
  xAxis,
  xAxis1,
  yAxis,
  svg,
  gX,
  gX1,
  gY,
  gChart,
  gTasks,
  gTasksNot,
  gScrollX,
  gScrollY,
  modal,
  modalContent,
  tip,
  dragTask,
  gScrollNot,
  totalNotHei;
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
  machines.forEach(m => {
    machinesById[m.id] = m.name;
  });
  machineIds = machines.map(d => d.id);
  statuses = {};
  data['statuses'].forEach(s => (statuses[s.id] = s.name));

  yTicksCnt = Math.min(yTicksCnt, machines.length);
  tickHeight = height / yTicksCnt;

  addFilters(data['statuses']);
  addCanvas();
  addPopups();
  addAxes();
  addTasks();
  addScrolls();
  changeTimeDomain(zoomLevel);
  render();
}

function render() {
  gX.call(xAxis);
  gX1.call(xAxis1).selectAll('text').attr('y', -8);
  gY.call(yAxis);
  gY.selectAll('text')
    .text(d => machinesById[d])
    .attr('transform', 'translate(' + [-mLabelWidth / 2 + 3, 0] + ')')
    .select(function () {
      const text = d3.select(this);
      const words = text.text().split(/\s+/).reverse();
      let word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        dy = parseFloat(text.attr('dy')),
        tspan = text
          .text(null)
          .append('tspan')
          .attr('x', 0)
          .attr('dy', dy + 'em'),
        txtHei = 0;

      while ((word = words.pop())) {
        line.push(word);
        tspan.text(line.join(' '));
        if (tspan.node().getComputedTextLength() > mLabelWidth - 20) {
          line.pop();
          tspan.text(line.join(' '));
          line = [word];
          tspan = text
            .append('tspan')
            .attr('x', 0)
            .attr('dy', ++lineNumber * lineHeight + dy + 'em')
            .text(word);

          txtHei += tspan.node().getBoundingClientRect().height;
        }
      }

      text.selectAll('tspan').attr('y', -txtHei / 2);
    });

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

  svg
    .append('defs')
    .append('clipPath')
    .attr('id', 'clipNS')
    .append('path')
    .attr(
      'd',
      `M0,${height + margin.top + margin.bottom + 10}H${width}V${
        height + margin.top + margin.bottom + tickHeight * 2 + 20
      }H0V${height + margin.top + margin.bottom + 10}`,
    );

  gChart = svg
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
}

function addAxes() {
  timeEnd = d3.max(tasks, d => d.end);
  timeStart = d3.min(tasks, d => d.start);
  timeOffset = zoomLevel * 86400000;

  let xEnd = timeEnd;

  if (timeStart + timeOffset < timeEnd) {
    xEnd = timeStart + timeOffset;
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

function addScrolls() {
  const gScrolls = gChart.append('g').classed('scrolls', true);

  gScrollX = gScrolls.append('g').attr('class', 'scroll x');
  gScrollX
    .append('rect')
    .classed('overlay', true)
    .attr('pointer-events', 'all')
    .attr('width', width)
    .attr('height', 20)
    .attr('x', 0)
    .attr('y', height + margin.top + 5);

  let dragXStart = null;

  const dragX = d3
    .drag()
    .on('start', function () {
      dragXStart = d3.event.x;
    })
    .on('drag', function () {
      if (dragXStart === null) return;

      const dx = d3.event.x;

      let s0 = parseFloat(gScrollX.select('.selection').attr('x'));
      const w = parseFloat(gScrollX.select('.selection').attr('width'));

      s0 += dx - dragXStart;
      let s1 = s0 + w;

      if (s0 < 0) {
        s0 = 0;
        s1 = w;
      }

      if (s1 > width) {
        s0 = width - w;
        s1 = width;
      }

      gScrollX.select('.selection').attr('x', s0);

      const d0 = new Date((s0 / width) * (timeEnd - timeStart) + timeStart);
      const d1 = new Date((s1 / width) * (timeEnd - timeStart) + timeStart);

      xAxis.scale().domain([d0, d1]);
      xAxis1.scale().domain([d0, d1]);

      dragXStart = dx;

      render();
    })
    .on('end', function () {
      dragXStart = null;
    });

  gScrollX
    .append('rect')
    .classed('selection', true)
    .attr('pointer-events', 'all')
    .attr('cursor', 'move')
    .attr('width', (timeOffset / (timeEnd - timeStart)) * width)
    .attr('height', 20)
    .attr('x', 0)
    .attr('y', height + margin.top + 5)
    .call(dragX);

  gScrollY = gScrolls.append('g').attr('class', 'scroll y');

  gScrollY
    .append('rect')
    .classed('overlay', true)
    .attr('pointer-events', 'all')
    .attr('width', 20)
    .attr('height', height)
    .attr('x', width + 10)
    .attr('y', 0);

  let dragYStart = null;

  const dragY = d3
    .drag()
    .on('start', function () {
      dragYStart = d3.event.y;
    })
    .on('drag', function () {
      if (dragYStart === null) return;

      const dy = d3.event.y;

      let s0 = parseFloat(gScrollY.select('.selection').attr('y')),
        h = parseFloat(gScrollY.select('.selection').attr('height'));

      s0 += dy - dragYStart;
      let s1 = s0 + h;

      if (s0 < 0) {
        s0 = 0;
        s1 = h;
      }

      if (s1 > height) {
        s0 = height - h;
        s1 = height;
      }

      gScrollY.select('.selection').attr('y', s0);

      const d0 = Math.round((s0 / height) * machineIds.length);
      const d1 = Math.round((s1 / height) * machineIds.length);

      yAxis.scale().domain(machineIds.slice(d0, d1));

      dragYStart = dy;

      render();
    })
    .on('end', function () {
      dragYStart = null;
    });

  gScrollY
    .append('rect')
    .classed('selection', true)
    .attr('pointer-events', 'all')
    .attr('cursor', 'move')
    .attr('width', 20)
    .attr('height', (yTicksCnt / machineIds.length) * height)
    .attr('x', width + 10)
    .attr('y', 0)
    .call(dragY);
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
      beforeEvent = { x: d3.event.x, y: d3.event.y };
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
      let dragX = xAxis.scale().invert(d3.event.x).getTime(),
        dragY = d3.event.y,
        transY = 0;

      if (statuses[d.status] === NOT_SCHEDULED) {
        const trans = d3.select('.tasksList').attr('transform');

        if (trans) {
          transY = parseFloat(
            trans.replace('translate(', '').replace(')', '').split(',')[1],
          );
        }

        dragY += transY;
      }

      const duration = d.end - d.start;
      d.start += dragX - dragStart;
      d.end = d.start + duration;
      dragStart = dragX;

      d.machine =
        Math.floor(
          (dragY / (yScale.range()[1] - yScale.range()[0])) *
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
            d3.select(this).append('path').attr('class', 'delay');
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
        d3.select(this).attr(
          'transform',
          () => 'translate(' + [xAxis.scale()(d.start), dragY] + ')',
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
        gTasksNot.select('.tasksList').append(() => d3.select(this).node());
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

  gTasksNot.append('path').classed('tasks-bg', true);

  gScrollNot = gTasksNot.append('g').attr('class', 'scroll not');
  gScrollNot
    .append('rect')
    .classed('overlay', true)
    .attr('pointer-events', 'all')
    .attr('width', 20)
    .attr('height', tickHeight * 2 + 10)
    .attr('x', width + 10)
    .attr('y', heiN + 10);

  let dStart = null;

  const drag = d3
    .drag()
    .on('start', function () {
      dStart = d3.event.y;
    })
    .on('drag', function () {
      if (dStart === null) return;

      const dy = d3.event.y;

      let y0 = parseFloat(d3.select(this).attr('y')),
        h = parseFloat(d3.select(this).attr('height'));

      y0 += dy - dStart;

      if (y0 + h > tickHeight * 2 + heiN + 20) {
        y0 = heiN + 20 + tickHeight * 2 - h;
      } else if (y0 < heiN + 10) {
        y0 = heiN + 10;
      }

      d3.select(this).attr('y', y0);

      const ty =
        ((y0 - heiN - 10) / (tickHeight * 2 + 10 - h)) *
        (totalNotHei - tickHeight * 2 - 10);

      gTasksNot
        .select('.tasksList')
        .attr('transform', 'translate(' + [0, -ty] + ')');

      dStart = dy;
    })
    .on('end', function () {
      dStart = null;
    });

  gScrollNot
    .append('rect')
    .classed('selection', true)
    .attr('pointer-events', 'all')
    .attr('cursor', 'move')
    .attr('width', 20)
    .attr('height', 60)
    .attr('x', width + 10)
    .attr('y', heiN + 10)
    .call(drag);

  gTasksNot
    .append('g')
    .classed('tasksWrapper', true)
    .attr('clip-path', 'url(#clipNS)')
    .append('g')
    .classed('tasksList', true)
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
      d3.select(that).append('path').attr('class', 'delay');
    }

    if ('progress' in d) {
      d3.select(that).append('path').attr('class', 'progress-bg');

      d3.select(that).append('path').attr('class', 'progress');

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

  d3.select(that).select('path.overlay').attr('d', `M0 0H${wid}V${hei}H0V0`);

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
          }H${progress + delay}V${hei}H${delay + 5}Q${delay} ${hei}, ${delay} ${
            hei - 5
          }`,
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
    .classed('small', wid < textMinWid)
    .attr('x', wid / 2 + delay)
    .attr('y', hei / 2);
}

function alignNotScheduledTasks() {
  const heiN = height + margin.top + margin.bottom;

  gTasksNot
    .select('path.tasks-bg')
    .attr(
      'd',
      `M0.5,${heiN + 10}H${width}V${heiN + tickHeight * 2 + 20}H0.5V${
        heiN + 10
      }`,
    );

  let xPos = 10,
    yPos = heiN + 20;

  totalNotHei = 10 + tickHeight;

  svg.attr('height', yPos + tickHeight * 2 + 40);

  gTasksNot
    .selectAll('.task')
    .attr('transform', () => {
      const translate = 'translate(' + [xPos, yPos] + ')';
      xPos += notSchTaskWid + 10;

      if (xPos + notSchTaskWid > width - 20) {
        xPos = 10;
        yPos += tickHeight;
        totalNotHei += tickHeight;
      }
      return translate;
    })
    .select(function (d) {
      updateTask(d, this);
    });
}

function setProgressSize(wid, hei, delay) {
  return `M${delay} ${hei - 15}Q${delay} ${hei - 20},${delay + 5} ${hei - 20}H${
    wid + delay - 5
  }Q${wid + delay} ${hei - 20},${wid + delay} ${hei - 15}V${hei - 5}Q${
    wid + delay
  } ${hei}, ${wid + delay - 5} ${hei}H${delay + 5}Q${delay} ${hei}, ${delay} ${
    hei - 5
  }`;
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
  modalContent = modalWrapper.append('div').classed('modal-content', true);
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

function changeTimeDomain(dur) {
  timeOffset = 86400000 * dur;

  let d0 = xScale.domain()[0].getTime(),
    d1 = d0 + timeOffset;

  if (timeOffset > timeEnd - timeStart) {
    d0 = timeStart;
    d1 = timeEnd;
  } else if (d0 < timeStart) {
    d0 = timeStart;
    d1 = d0 + timeOffset;
  } else if (d1 > timeEnd) {
    d1 = timeEnd;
    d0 = d1 - timeOffset;
  }

  xScale.domain([d0, d1]);

  xAxis.scale(xScale);
  xAxis1.scale(xScale);

  const b0 = ((d0 - timeStart) / (timeEnd - timeStart)) * width;
  const b1 = ((d1 - timeStart) / (timeEnd - timeStart)) * width;

  gScrollX.select('.selection').attr('x', b0);
  gScrollX.select('.selection').attr('width', b1 - b0);

  render();
}

d3.json('./assets/datatest/data.5m.json').then(data => {
  visualize(data);
});
