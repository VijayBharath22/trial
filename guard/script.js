let charts = []; // Store chart instances

const createChart = (ctx, data, isDarkMode = false) => {
  const textColor = isDarkMode ? "#ffffff" : "#333333"; // White for dark mode, dark gray for light mode
  return new Chart(ctx, {
    type: "line",
    data: {
      labels: ["8 AM", "10 AM", "12 PM", "2 PM", "4 PM", "6 PM", "8 PM"],
      datasets: [
        {
          label: "Daily Visitors",
          data: data,
          borderColor: "#4c6ef5",
          backgroundColor: "rgba(76, 110, 245, 0.1)",
          borderWidth: 2,
          pointRadius: 3,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false, // Hides the legend
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Time",
            color: textColor, // Dynamic color for x-axis title
          },
          ticks: {
            color: textColor, // Dynamic color for x-axis labels
          },
        },
        y: {
          title: {
            display: true,
            text: "Number of Visitors",
            color: textColor, // Dynamic color for y-axis title
          },
          ticks: {
            color: textColor, // Dynamic color for y-axis labels
          },
          min: 0,
          max: 600,
        },
      },
    },
  });
};

const initializeCharts = (isDarkMode) => {
  // Dispose of existing charts before recreating them
  charts.forEach((chart) => chart.destroy());
  charts = []; // Clear the chart instances array

  charts.push(
    createChart(
      document.getElementById("lhcChart").getContext("2d"),
      [150, 300, 450, 500, 450, 300, 150],
      isDarkMode
    )
  );
  charts.push(
    createChart(
      document.getElementById("apexChart").getContext("2d"),
      [30, 40, 50, 60, 50, 40, 30],
      isDarkMode
    )
  );
  charts.push(
    createChart(
      document.getElementById("esbChart").getContext("2d"),
      [200, 400, 500, 550, 500, 400, 200],
      isDarkMode
    )
  );
};

// Initialize charts in default light mode
initializeCharts(false);

// Toggle details on click
document.querySelectorAll(".specialties").forEach((specialty) => {
  specialty.addEventListener("click", function (event) {
    const details = this.querySelector(".details");
    details.style.display =
      details.style.display === "block" ? "none" : "block";
    event.stopPropagation();
  });
});

// Hide details if clicked outside
document.addEventListener("click", function (event) {
  if (!event.target.closest(".specialties")) {
    document.querySelectorAll(".details").forEach((details) => {
      details.style.display = "none";
    });
  }
});

// Theme switcher functionality
document.addEventListener("DOMContentLoaded", () => {
  const themeSwitcher = document.getElementById("theme-switcher");
  const body = document.body;

  // Check localStorage for saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    body.classList.add(savedTheme);
    initializeCharts(savedTheme === "dark-mode");
    updateSwitcherIcon(savedTheme);
  }

  themeSwitcher.addEventListener("click", () => {
    const isDarkMode = body.classList.toggle("dark-mode");
    const theme = isDarkMode ? "dark-mode" : "light-mode";

    // Save the theme preference in localStorage
    localStorage.setItem("theme", theme);

    // Update the switcher icon
    updateSwitcherIcon(theme);

    // Reinitialize charts with the appropriate theme
    initializeCharts(isDarkMode);
  });

  function updateSwitcherIcon(theme) {
    const icon = themeSwitcher.querySelector("i");
    if (theme === "dark-mode") {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    } else {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    }
  }
});
