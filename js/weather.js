const appConstants = {
    apiKey: "8a64dd797f14a8e9ee4b0e7d93344627",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather",
    units: "metric",
    unknownValue: "NA",
    imageUrl: "http://openweathermap.org/img/wn/",
  };
  
  function getWeatherInformation(event) {
    event.preventDefault();
    const location = document.querySelector(".nav_search input").value;
    fetch(
      `${appConstants.baseUrl}?q=${location}&units=${appConstants.units}&APPID=${appConstants.apiKey}`
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw Error("Error fetching data."); 
      })
      .then((data) => {
        updateDom(data);
      })
      .catch((error) => {
        console.error(error);
        alert(`Error getting information for ${location}`);
      });
    //   window.alert("fetch working");
  }
  
  //returned data or list
  function updateDom(data) {
    const dateInformation = getDateInformation();
  
    // Update day
    document.querySelector(
      "#weather_day"
    ).innerHTML = dateInformation.day;
  
    // Update date
    document.querySelector(
      "#weather_date"
    ).innerHTML = `${dateInformation.date} ${dateInformation.month} ${dateInformation.year}`;
  
    // Update location
    document.querySelector(
      "#weather_city"
    ).innerHTML = `${data?.name || appConstants.unknownValue}, ${
      data?.sys?.country || appConstants.unknownValue
    }`;
  
    // Update image
    document
      .querySelector(
        ".weather_img img"
      )
      .setAttribute(
        "src",
        `${appConstants.imageUrl}${data?.weather?.[0]?.icon}.png`
      );
  
    // Update temperature
    document.querySelector(
      ".weather_temp"
    ).innerHTML = `${parseInt(data?.main?.temp || 0)}`;//can add degress here
  
    // Update description
    document.querySelector(
      "#weather_desc"
    ).innerHTML = `${data?.weather?.[0]?.main || appConstants.unknownValue}`;
  
    // Update information data
    const infoNodes = document.querySelectorAll(".container_right span");

      //wind speed m/s
      infoNodes[0].innerHTML = `${
        data?.wind?.speed || appConstants.unknownValue
      }&nbsp;m/s`;

      // wind direction degrees
      infoNodes[1].innerHTML = `${
        data?.wind?.deg || appConstants.unknownValue
      }&deg;`;

      //humidity %
      infoNodes[2].innerHTML = `${
        data?.main?.humidity || appConstants.unknownValue
      }%`;
      
      // min temp C
      infoNodes[3].innerHTML = `${
        data?.main?.temp_min || appConstants.unknownValue
      }&deg;C`;
      // max temp C
      infoNodes[4].innerHTML = `${
        data?.main?.temp_max || appConstants.unknownValue
      }&deg;C`;
      // pressure hPa
      infoNodes[5].innerHTML = `${
        data?.main?.pressure || appConstants.unknownValue
      }&nbsp;hPa`;
      // visibility mtrs
      infoNodes[6].innerHTML = `${
        data?.visibility || appConstants.unknownValue
      }&nbsp;mtrs`;
      //clouds %
      infoNodes[7].innerHTML = `${
        data?.clouds?.all || appConstants.unknownValue
      }%`;
      

  }
  
  function getDateInformation() {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const d = new Date();
    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return {
      day,
      date,
      month,
      year,
    };
  }


  