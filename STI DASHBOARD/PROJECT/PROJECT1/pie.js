// xbar.js

// 페이지가 로드되면 그래프를 그리기 위해 콜백 함수를 등록
document.addEventListener('DOMContentLoaded', function () {
    // ECharts 인스턴스 생성
    var myChart = echarts.init(document.getElementById('pie'));
  
    // CSV 파일 경로 설정
    var csvFilePath = 'pietest.csv';
  
    // Fetch API를 사용하여 CSV 파일을 읽어옴
    fetch(csvFilePath)
      .then(response => response.text())
      .then(csvData => {
        // CSV 데이터를 가공하여 series 데이터로 변환
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
          seriesData.push({ name: name, value: data.reduce((a, b) => a + b, 0) });
        }
  
        // 그래프 옵션 설정
        var option = {
          // 그래프 크기 설정
          grid: {
            top: 60,
            bottom: 30,
            left: 50,
            right: 30,
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
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
          series: [
            {
              type: 'pie',
              radius: '55%', // 원형 차트의 크기 설정
              center: ['50%', '60%'], // 원형 차트의 위치 설정
              data: seriesData,
              // 라벨 옵션 설정
              label: {
                show: true,
                formatter: '{b} : {c} ({d}%)',
                fontSize: 16,
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 20,
                  fontWeight: 'bold',
                },
              },
            },
          ],
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
  