// ybar.js

// 페이지가 로드되면 그래프를 그리기 위해 콜백 함수를 등록
document.addEventListener('DOMContentLoaded', function () {
    // ECharts 인스턴스 생성
    var myChart = echarts.init(document.getElementById('ybar'));
  
    // CSV 파일 경로 설정
    var csvFilePath = 'test.csv';
  
    // Fetch API를 사용하여 CSV 파일을 읽어옴
    fetch(csvFilePath)
      .then(response => response.text())
      .then(csvData => {
        // CSV 데이터를 가공하여 yAxis와 series 데이터로 변환
        var lines = csvData.split('\n');
        var headers = lines[0].split(',').slice(1); // 첫 번째 행을 헤더로 사용
        var seriesData = [];
  
        // 다수의 행과 열이 있는 데이터 가공
        for (var i = 1; i < lines.length; i++) {
          var values = lines[i].split(',');
          var name = values[0];
          var data = [];
          for (var j = 1; j < values.length; j++) {
            data.push(parseFloat(values[j]));
          }
          seriesData.push({ name: name, data: data });
        }
  
        // 그래프 옵션 설정
        var option = {
          // 그래프 크기 설정
          grid: {
            top: 60,
            bottom: 30,
            left: 100, // x축이 가로 막대 그래프의 데이터로 변경되었으므로 left와 right 값을 조정해줍니다.
            right: 30,
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: headers,
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ['line', 'bar', 'stack'] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          xAxis: [ // x축과 y축이 서로 바뀌었습니다.
            {
              type: 'value'
            }
          ],
          yAxis: [ // x축과 y축이 서로 바뀌었습니다.
            {
              type: 'category',
              axisTick: { show: false },
              data: headers,
            }
          ],
          series: seriesData.map(function (item) {
            return {
              type: 'bar', // 'bar-horizontal'에서 'bar'로 변경되었습니다.
              name: item.name,
              data: item.data,
              // 라벨 옵션 설정
              label: {
                show: true,
                position: 'right', // 라벨의 위치도 변경되었습니다.
                distance: 15,
                align: 'center',
                verticalAlign: 'middle',
                rotate: 0,
                formatter: '{c}  {name|{a}}',
                fontSize: 16,
                rich: {
                  name: {}
                }
              }
            };
          }),
        };
  
        // 그래프 그리기
        myChart.setOption(option);
  
        // 콘솔에 그래프 옵션 정보 출력
        console.log(option);
      })
      .catch(error => {
        console.error('Error fetching CSV file:', error);
      });
  });
  