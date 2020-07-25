const margin = { top: 10, left: 150, bottom: 30, right: 10 };
const width =
  document.body.getBoundingClientRect().width - margin.left - margin.right;
const height = Math.min(
  400,
  document.body.getBoundingClientRect().height - margin.top - margin.bottom,
);

const numberOfPoints = 100;
const pointRadius = 3;
const numberOfSeries = 5;
const numberOfTicks = 5;

d3.csv('./sample.csv').then(data => {
  const labels = [
    'STREAMS("309") Fm kg/hr',
    'STREAMS("309") Rhom kg/m3',
    'STREAMS("309") Fv m3/hr',
    'STREAMS("310") T C',
    'STREAMS("310") P bar',
  ];

  data.sort((x, y) => d3.ascending(x.x, y.x));

  const xExtent = d3.extent(data, d => d.x);

  const yExtents = [];

  for (let i = 0; i < numberOfSeries; i++) {
    yExtents.push([
      Math.min(data[0]['symbol' + (i + 1)], data[0]['line' + (i + 1)]),
      Math.max(data[0]['symbol' + (i + 1)], data[0]['line' + (i + 1)]),
    ]);

    for (let j = 1; j < data.length; j++) {
      d = data[j];

      const recMax = Math.max(d['symbol' + (i + 1)], d['line' + (i + 1)]);
      const recMin = Math.min(d['symbol' + (i + 1)], d['line' + (i + 1)]);

      if (recMin < yExtents[i][0]) {
        yExtents[i][0] = recMin;
      }

      if (recMax > yExtents[i][1]) {
        yExtents[i][1] = recMax;
      }
    }
  }

  const tickVals = formatYAxes(yExtents);

  const xScale = d3
    .scaleLinear()
    .domain([xExtent[0], xExtent[1]])
    .range([0, width]);

  const yScales = [];

  for (let i = 0; i < numberOfSeries; i++) {
    yScales.push(
      d3
        .scaleLinear()
        .domain([tickVals[i][0], tickVals[i][tickVals[i].length - 1]])
        .range([height, 0]),
    );
  }

  const colors = ['#0037ff', '#198039', '#ff0000', '#c000ff', '#777777'];
  const symbolGenerator = d3.symbol().size(30);
  var symbolTypes = [
    'symbolCircle',
    'symbolSquare',
    'symbolTriangle',
    'symbolDiamond',
    'symbolCross',
  ];

  const svg = d3
    .select('#container')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .style('position', 'absolute')
    .style('z-index', 1)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  d3.select('#container')
    .style('width', width + margin.left + margin.right + 'px')
    .style('height', height + margin.top + margin.bottom + 'px');

  const xAxis = d3
    .axisBottom(xScale)
    .tickSizeInner(-height)
    .tickSizeOuter(0)
    .tickPadding(5);
  const xAxisSvg = svg
    .append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);
  xAxisSvg
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate(' + width / 2 + ', 25)')
    .attr('fill', 'currentColor')
    .classed('label', true)
    .text('Time Hours');

  const yAxesSvg = svg.append('g').classed('y-axes', true);

  const yAxes = [];

  for (let i = 0; i < numberOfSeries; i++) {
    yAxes[i] = d3
      .axisLeft(yScales[i])
      .ticks(5)
      .tickSizeInner(-3)
      .tickSizeOuter(0)
      .tickPadding(5);
  }

  const yAxisSvgs = [];

  for (let i = 0; i < numberOfSeries; i++) {
    yAxisSvgs[i] = yAxesSvg
      .append('g')
      .attr('class', 'axis y-axis')
      .attr(
        'transform',
        'translate(' + -30 * (numberOfSeries - i - 1) + ',' + 0 + ')',
      );
    yAxisSvgs[i]
      .call(yAxes[i])
      .selectAll('text')
      .attr('dx', '1em')
      .attr('dy', '-.4em')
      .attr('transform', 'rotate(-90)')
      .style('text-anchor', 'center');
    const labelSvg = yAxisSvgs[i]
      .append('g')
      .attr('transform', 'translate(-15, ' + height / 2 + ') rotate(-90)');

    const linePaths = [
      'M-110.5,-3.5H-80.5',
      'M-120.5,-3.5H-90.5',
      'M-110.5,-3.5H-80.5',
      'M-100.5,-3.5H-70.5',
      'M-100.5,-3.5H-70.5',
    ];
    labelSvg.append('path').attr('d', linePaths[i]).attr('stroke', colors[i]);
    const symbolPaths = [
      [-95, -3.5],
      [-105, -3.5],
      [-95, -3.5],
      [-85, -3.5],
      [-85, -3.5],
    ];
    labelSvg
      .append('path')
      .style('stroke', colors[i])
      .attr('transform', 'translate(' + symbolPaths[i] + ')')
      .attr('d', d => {
        symbolGenerator.type(d3[symbolTypes[i]]);
        return symbolGenerator();
      });
    labelSvg
      .append('text')
      .attr('text-anchor', 'middle')
      .classed('label', true)
      .attr('fill', colors[i])
      .text(labels[i]);
  }

  for (let i = 0; i < numberOfSeries; i++) {
    yAxesSvg
      .append('path')
      .classed('line', true)
      .attr('stroke', 'currentColor')
      .attr('d', 'M0.5,' + ((height / 5) * i + 0.5) + 'H1000.5');
  }

  const chartSvg = svg.append('g').classed('chart', true);

  draw();

  // draw points
  function draw() {
    for (let i = 0; i < numberOfSeries; i++) {
      const symbols = chartSvg.append('g').classed('symbols-' + (i + 1), true);
      const lines = chartSvg.append('g').classed('liness-' + (i + 1), true);
      lines
        .append('path')
        .data([data])
        .attr('class', 'line')
        .attr(
          'd',
          d3
            .line()
            .x(d => xScale(d.x))
            .y(d => yScales[i](d['line' + (i + 1)])),
        )
        .style('stroke', function (d) {
          return colors[i];
        });

      symbols
        .selectAll('symbol')
        .data(data)
        .enter()
        .append('path')
        .style('stroke', colors[i])
        .attr(
          'transform',
          d =>
            'translate(' +
            xScale(d.x) +
            ', ' +
            yScales[i](d['symbol' + (i + 1)]) +
            ')',
        )
        .attr('d', d => {
          symbolGenerator.type(d3[symbolTypes[i]]);
          return symbolGenerator();
        });
    }
  }
});

function formatYAxes(extents) {
  const tickVals = [];

  for (let i = 0; i < numberOfSeries; i++) {
    let tick = extents[i][1] / 5;

    if (tick % 5 !== 0) {
      const log = Math.floor(Math.log(tick) / Math.log(10));
      tick = Math.ceil(tick / Math.pow(10, log)) * Math.pow(10, log);
    }

    tickVals.push([]);

    for (let j = 0; j <= numberOfTicks; j++) {
      if (
        (tick * (j + 1) > extents[i][0] && tick * j < extents[i][0]) ||
        tick * j > extents[i][0]
      ) {
        tickVals[i].push(tick * j);
      }
    }
  }

  return tickVals;
}
