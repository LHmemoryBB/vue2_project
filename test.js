

let attractionCitiesMap = {};
list.forEach((item) => {
  const city = item.attraction_cities;
  const name = item.attraction_name;
  // 如果当前城市不存在于统计对象中，则创建一个空数组
  if (!attractionCitiesMap[city]) {
    attractionCitiesMap[city] = [];
  }
  // 如果当前景点名称不存在于当前城市的数组中，则添加到数组中
  if (!attractionCitiesMap[city].includes(name)) {
    attractionCitiesMap[city].push(name);
  }
});
const xAxis = [

];
const nowDate = this.$dayJs().format("YYYY-MM")
for (let index = 0; index < 12; index++) {
  xAxis.push(nowDate.subtract(index, 'month'))
}
console.log(xAxis);
const splitData = {
};
for (const city in attractionCitiesMap) {
  const attractions = attractionCitiesMap[city];
  let cityData = {
    names: attractions,
    values: Array.from({ length: attractions.length }, () => new Array(xAxis.length).fill(0)),
    xAxis: xAxis,
  };
  xAxis.forEach((date, dateIndex) => {
    list.forEach((attraction, cityIndex) => {
      if (attraction.attraction_cities === city) {
        const index = attractions.indexOf(attraction.attraction_name)
        if (attraction.appointment_time === date) {
          cityData.values[index][dateIndex] += attraction.number_of_reservations
        }
      }
    });
  });
  setTimeout(() => {
    console.log(cityData);
  }, 4000);
  splitData[city] = cityData;
}

json = {
  上饶市: {
    names: ["婺源篁岭"],
    values: [10],
    xAxis: [],
  },
  南昌市: {
    names: ["江西省博物馆"],
    values: [],
    xAxis: [
      "2023-06",
      "2023-07",
      "2023-08",
      "2023-09",
      "2023-10",
      "2023-11",
      "2023-12",
      "2024-01",
      "2024-02",
      "2024-03",
      "2024-04",
      "2024-05",
    ],
  },
};
