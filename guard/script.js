
const createChart = (ctx, data) => {
    new Chart(ctx, {
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
            display: false, // Hides the legend entirely
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Time",
            },
          },
          y: {
            title: {
              display: true,
              text: "Number of Visitors",
            },
            min: 0,
            max: 600,
          },
        },
      },
    });
  };

  // Initialize charts
  createChart(
    document.getElementById("lhcChart").getContext("2d"),
    [150, 300, 450, 500, 450, 300, 150]
  );
  createChart(
    document.getElementById("apexChart").getContext("2d"),
    [30, 40, 50, 60, 50, 40, 30]
  );
  createChart(
    document.getElementById("esbChart").getContext("2d"),
    [200, 400, 500, 550, 500, 400, 200]
  );

  // Toggle details on click
  document.querySelectorAll(".specialties").forEach((specialty) => {
    specialty.addEventListener("click", function (event) {
      const details = this.querySelector(".details");
      // Toggle details visibility
      details.style.display =
        details.style.display === "block" ? "none" : "block";
      // Stop the event from bubbling up to document (so it doesn't immediately hide the details)
      event.stopPropagation();
    });
  });

  // Hide details if clicked outside
  document.addEventListener("click", function (event) {
    // Check if the click was outside of any specialty card
    if (!event.target.closest(".specialties")) {
      // Hide all details
      document.querySelectorAll(".details").forEach((details) => {
        details.style.display = "none";
      });
    }
  });
