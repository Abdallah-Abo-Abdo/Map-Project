// print the element the user clicked in the Console
// document.addEventListener("click", function handleClickOutsideBox(event) {
//   console.log("user clicked: ", event.target);
// });

// disable the left mouse Click
document.oncontextmenu = document.body.oncontextmenu = function () {
  return false;
};

// Two function to move from pages with some animation
window.Truns_01 = function (href) {
  document.querySelector("body").classList.add("Truns_01");
  setTimeout(function () {
    window.location.href = href;
  }, 1000);
};

window.Truns_02 = function (href) {
  document.querySelector("body").classList.add("Truns_02");
  setTimeout(function () {
    window.location.href = href;
  }, 1000);
};

// ================================================================================
jQuery(document).ready(function () {
  // $(".all-lines").hide(1000);
  var scroll_zoom = new ScrollZoom($(".Zoom"), 20, 0.05);

  jQuery(".all-lines path").click(function () {
    Truns_01("./Tubes.html");
  });

  jQuery(".all-circles circle").click(function () {
    Truns_01("./Jont.html");
  });

  jQuery(".all-circles .main-shape").click(function () {
    Truns_01("./patch.html");
  });

  jQuery(".rect .rect-lines").click(function () {
    Truns_01("./Links.html");
  });

  jQuery(".all-cables").click(function () {
    Truns_02("./Tubes.html");
  });

  // (Jont - page) >>> ;
  if (document.getElementById("Jont-page")) {
    // link_Connection($(".cable-04-t01-sh01"), $(".cable-06-t09-sh03"));
    // link_Connection($(".cable-01-t08-sh05"), $(".cable-04-t01-sh12"));
    // link_Connection($(".cable-04-t01-sh01"), $(".cable-07-t05-sh12"));
    // link_Connection($(".cable-07-t12-sh01"), $(".cable-03-t02-sh01"));

    jQuery("#Edit-jontinfo").click(function () {
      $("#form10,#form11,#form12,#form13,#form14,#form15").removeAttr(
        "disabled"
      );
      $("#Edit-jontinfo").hide();
      $("#send-jontinfo").show();

      jQuery("#send-jontinfo").click(function () {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "تم حفظ التعديلات",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    });

    jQuery("#work-tasks-btn").click(function () {
      window.location = "./Tasks.html";
    });
    // ==================================================================================
    // Add Connetion between Hairs in JontPage
    $("#Btn-addConnection").bind("click", function (event) {
      // Avoid the real one
      event.preventDefault();

      // Show contextmenu
      $(".custom-menu-3")
        .finish()
        .toggle(100)
        // In the right position (the mouse)
        .css({
          top: event.pageY + "px",
          left: event.pageX + "px",
        });
    });

    // If the document is clicked somewhere
    $(document).bind("mousedown", function (e) {
      // If the clicked element is not the menu
      if (!$(e.target).parents(".custom-menu-3").length > 0) {
        // Hide it
        $(".custom-menu-3").hide(100);
      }
    });

    // If the menu element is clicked
    $(".custom-menu-3 li").click(function () {
      // This is the triggered action name
      switch ($(this).attr("data-action")) {
        // A case for each action. Your actions here

        case "fifth":
          Swal.fire({
            title: "يرجى تحديد اللنك الأول",
            showCancelButton: true,
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              jQuery(".all-cables").off("click");
              jQuery(".all-cables #hair").click(function (evt) {
                console.log(
                  "user clicked: ",
                  evt.target.getAttribute("class", "id")
                );

                Swal.fire({
                  // title: "تم تحديد المنطقة الأولى \n يرجى تحديد المنطقة الثانية ",
                  title: "يرجى تحديد اللنك الثاني ",
                  showCancelButton: true,
                  confirmButtonText: "OK",
                }).then((result) => {
                  if (result.isConfirmed) {
                    jQuery(".all-cables").off("click");
                    jQuery(".all-cables #hair").click(function (evt) {
                      console.log(
                        "user clicked: ",
                        evt.target.getAttribute("class", "id")
                      );
                      Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "تم  ",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                      link_Connection(
                        $(".cable-04-t01-sh01"),
                        $(".cable-06-t09-sh03")
                      );

                      jQuery("#jont-svg").off("click");
                    });
                  }
                });
              });
            }
          });
          break;
      }

      // Hide it AFTER the action was triggered
      $(".custom-menu-3").hide(300);
    });
  }

  jQuery(
    "#line43 ,#line44 , #line45 , #line46 , #line47 , #line48 , #line49 , #line50 , #line51 , #line52 , #line53 , #line54 "
  ).click(function () {
    $("#modalContactForm").modal("toggle");
  });

  jQuery(".modal .CloseModal-btn  ").click(function () {
    $("#modalContactForm").modal("hide");
  });

  jQuery(".ShowPath-btn").click(function () {
    window.location = "./V_Archiving.html";
  });

  // $(".New-circles").html('<circle cx="100" cy="50"/>');
  //==========================================================================
  // Delete Menu
  // Trigger action when the contexmenu is about to be shown
  $(".all-lines path , .all-circles circle , .all-circles .main-shape").bind(
    "contextmenu",
    function (event) {
      // Avoid the real one
      event.preventDefault();

      // Show contextmenu
      $(".custom-menu")
        .finish()
        .toggle(100)
        // In the right position (the mouse)
        .css({
          top: event.pageY + "px",
          left: event.pageX + "px",
        });

      console.log(
        "user clicked: ",
        event.target.getAttribute("class") || event.target.getAttribute("id")
      );
    }
  );

  // If the document is clicked somewhere
  $(".all-lines path , .all-circles circle , .all-circles .main-shape").bind(
    "mousedown",
    function (e) {
      // If the clicked element is not the menu
      if (!$(e.target).parents(".custom-menu").length > 0) {
        // Hide it
        $(".custom-menu").hide(100);
      }
      document.onclick = function (e) {
        $(".custom-menu").hide(100);
      };
    }
  );

  // If the menu element is clicked
  $(".custom-menu li").click(function () {
    // This is the triggered action name
    switch ($(this).attr("data-action")) {
      // A case for each action. Your actions here
      case "first":
        Swal.fire({
          title:
            "<i class='fas fa-paper-plane-o ml-1'></i> هل تريد تأكيد الحذف",
          showCancelButton: true,
          confirmButtonText: "OK",
          focusConfirm: false,
          focusCancel: true,
          confirmButtonColor: "rgb(211, 79, 79)",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: " تم الحذف",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
        break;
    }

    // Hide it AFTER the action was triggered
    $(".custom-menu").hide(300);
  });

  //==========================================================================
  // Add Menu
  // Trigger action when the contexmenu is about to be shown
  $("#Btn-addcircle").bind("click", function (event) {
    // Avoid the real one
    event.preventDefault();

    // Show contextmenu
    $(".custom-menu-2")
      .finish()
      .toggle(100)
      // In the right position (the mouse)
      .css({
        top: event.pageY + "px",
        left: event.pageX + "px",
      });
  });

  // If the document is clicked somewhere
  $(document).bind("mousedown", function (e) {
    // If the clicked element is not the menu
    if (!$(e.target).parents(".custom-menu-2").length > 0) {
      // Hide it
      $(".custom-menu-2").hide(100);
    }
  });

  // If the menu element is clicked
  $(".custom-menu-2 li").click(function () {
    // This is the triggered action name
    switch ($(this).attr("data-action")) {
      // A case for each action. Your actions here

      case "second":
        Swal.fire({
          title: "حدد إحداثيات المنطقة المراد إضافتها",
          showCancelButton: true,
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            let eleSvg = document.getElementById("main-svg");
            eleSvg.addEventListener(
              "dblclick",
              function coordinates({ clientX, clientY }) {
                let point = eleSvg.createSVGPoint();
                point.x = clientX; // 282
                point.y = clientY; // 226
                point = point.matrixTransform(eleSvg.getScreenCTM().inverse());
                // console.log(point);
                console.log(`pointX = ${point.x}`);
                console.log(`pointY = ${point.y}`);
                // point = (1050, 407)
                eleSvg.removeEventListener("dblclick", coordinates);
              }
            );
          }
        });
        break;
      case "third":
        Swal.fire({
          title: "حدد إحداثيات المنطقة المراد إضافتها",
          showCancelButton: true,
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            let eleSvg = document.getElementById("main-svg");
            eleSvg.addEventListener(
              "dblclick",
              function coordinates({ clientX, clientY }) {
                let point = eleSvg.createSVGPoint();
                point.x = clientX; // 282
                point.y = clientY; // 226
                point = point.matrixTransform(eleSvg.getScreenCTM().inverse());
                // console.log(point);
                console.log(`pointX = ${point.x}`);
                console.log(`pointY = ${point.y}`);
                // point = (1050, 407)
                eleSvg.removeEventListener("dblclick", coordinates);
              }
            );
            // eleSvg.addEventListener("dblclick", ({ clientX, clientY }) => {});
          }
        });
        break;
      case "fourth":
        Swal.fire({
          title: "يرجى تحديد المنطقة الأولى",
          showCancelButton: true,
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            jQuery(
              ".all-circles circle ,.all-circles .main-shape ,.all-lines path "
            ).off("click");
            jQuery(".all-circles circle ,.all-circles .main-shape").click(
              function (evt) {
                console.log(
                  "user clicked: ",
                  evt.target.getAttribute("class", "id")
                );

                Swal.fire({
                  // title: "تم تحديد المنطقة الأولى \n يرجى تحديد المنطقة الثانية ",
                  title: "يرجى تحديد المنطقة الثانية ",
                  showCancelButton: true,
                  confirmButtonText: "OK",
                }).then((result) => {
                  if (result.isConfirmed) {
                    jQuery(
                      ".all-circles circle ,.all-circles .main-shape ,.all-lines path"
                    ).off("click");
                    jQuery(
                      ".all-circles circle ,.all-circles .main-shape"
                    ).click(function (evt) {
                      console.log(
                        "user clicked: ",
                        evt.target.getAttribute("class", "id")
                      );
                      Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "تم  ",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                      jQuery(
                        ".all-circles circle ,.all-circles .main-shape ,.all-lines path"
                      ).off("click");
                    });
                  }
                });
              }
            );
          }
        });
        break;
    }

    // Hide it AFTER the action was triggered
    $(".custom-menu-2").hide(300);
  });

  //==========================================================================
});

// =======================================================

function ScrollZoom(container, max_scale, factor) {
  var target = container.children().first();
  var size = {
    w: target.width(),
    h: target.height(),
  };
  var pos = {
    x: 0,
    y: 0,
  };
  var scale = 1;
  var zoom_target = {
    x: 0,
    y: 0,
  };
  var zoom_point = {
    x: 0,
    y: 0,
  };
  var curr_tranform = target.css("transition");
  var last_mouse_position = {
    x: 0,
    y: 0,
  };
  var drag_started = 0;

  target.css("transform-origin", "0 0");
  target.on("mousewheel DOMMouseScroll", scrolled);
  target.on("mousemove", moved);
  target.on("mousedown", function () {
    drag_started = 1;
    target.css({
      cursor: "move",
      transition: "transform 0s",
    });
    /* Save mouse position */
    last_mouse_position = {
      x: event.pageX,
      y: event.pageY,
    };
  });

  target.on("mouseup mouseout", function () {
    drag_started = 0;
    target.css({
      cursor: "default",
      transition: curr_tranform,
    });
  });

  function scrolled(e) {
    var offset = container.offset();
    zoom_point.x = e.pageX - offset.left;
    zoom_point.y = e.pageY - offset.top;

    e.preventDefault();
    var delta = e.delta || e.originalEvent.wheelDelta;
    if (delta === undefined) {
      //we are on firefox
      delta = e.originalEvent.detail;
    }
    delta = Math.max(-1, Math.min(1, delta)); // cap the delta to [-1,1] for cross browser consistency

    // determine the point on where the slide is zoomed in
    zoom_target.x = (zoom_point.x - pos.x) / scale;
    zoom_target.y = (zoom_point.y - pos.y) / scale;

    // apply zoom
    scale += delta * factor * scale;
    scale = Math.max(1, Math.min(max_scale, scale));

    // calculate x and y based on zoom
    pos.x = -zoom_target.x * scale + zoom_point.x;
    pos.y = -zoom_target.y * scale + zoom_point.y;

    update();
  }

  function moved(event) {
    if (drag_started == 1) {
      var current_mouse_position = {
        x: event.pageX,
        y: event.pageY,
      };
      var change_x = current_mouse_position.x - last_mouse_position.x;
      var change_y = current_mouse_position.y - last_mouse_position.y;

      /* Save mouse position */
      last_mouse_position = current_mouse_position;
      //Add the position change
      pos.x += change_x;
      pos.y += change_y;

      update();
    }
  }

  function update() {
    // Make sure the slide stays in its container area when zooming out
    if (pos.x > 0) pos.x = 0;
    if (pos.x + size.w * scale < size.w) pos.x = -size.w * (scale - 1);
    if (pos.y > 0) pos.y = 0;
    if (pos.y + size.h * scale < size.h) pos.y = -size.h * (scale - 1);

    target.css(
      "transform",
      "translate(" +
        pos.x +
        "px," +
        pos.y +
        "px) scale(" +
        scale +
        "," +
        scale +
        ")"
    );
  }
  //main-page
  if (document.getElementById("main-page")) {
    setInterval(() => {
      if (pos.x === 0 || pos.y === 0) {
        // $(".all-lines").hide(200);
      }

      if (-pos.x >= 1300 && -pos.y >= 800) {
        // $(".all-lines").show(200);
      }
    }, 500);
  }
}

// ===========================================================================
function link_Connection(p1, p2) {
  const regex = /\d{0,3},\d{0,3}/;

  let p1_mx = p1[0].attributes[1].nodeValue.match(regex)[0].split(",")[0];
  let p1_my = p1[0].attributes[1].nodeValue.match(regex)[0].split(",")[1];

  let p2_mx = p2[0].attributes[1].nodeValue.match(regex)[0].split(",")[0];
  let p2_my = p2[0].attributes[1].nodeValue.match(regex)[0].split(",")[1];

  // console.log(p1[0].attributes[1].nodeValue.match(regex)[0].split(","));
  // console.log(p2[0].attributes[1].nodeValue.match(regex)[0].split(","));
  // console.log(p1_mx);
  // console.log(p1_my);
  // console.log(p2_mx);
  // console.log(p2_my);

  SVG(document.getElementById("fb-connetors"))
    .path()
    .M({
      x: p1_mx,
      y: p1_my,
    })
    .Q(
      {
        x: 600,
        y: 300,
      },
      {
        x: p2_mx,
        y: p2_my,
      }
    )
    .drawAnimated({
      delay: 1000,
    });
}

// ============================================================================

function circles_Connection(c1, c2) {
  let x1 =
    document.querySelector(c1).getAttribute("cx") * 1 ||
    document.querySelector(c1).getAttribute("x") * 1;
  let y1 =
    document.querySelector(c1).getAttribute("cy") * 1 ||
    document.querySelector(c1).getAttribute("y") * 1;

  let x2 =
    document.querySelector(c2).getAttribute("cx") * 1 ||
    document.querySelector(c2).getAttribute("x") * 1;
  let y2 =
    document.querySelector(c2).getAttribute("y") * 1 ||
    document.querySelector(c2).getAttribute("cy") * 1;

  SVG(document.getElementById("cir-connetors"))
    .path()
    .M({
      x: x1,
      y: y1,
    })
    .Q(
      {
        x: x1,
        y: y2,
      },
      {
        x: x2,
        y: y2,
      }
    )
    .attr("id", "newId")
    .fill("none");
}

function circles_Connection_02(c1, c2) {
  let x1 =
    document.querySelector(c1).getAttribute("cx") * 1 ||
    document.querySelector(c1).getAttribute("x") * 1;
  let y1 =
    document.querySelector(c1).getAttribute("cy") * 1 ||
    document.querySelector(c1).getAttribute("y") * 1;

  let x2 =
    document.querySelector(c2).getAttribute("cx") * 1 ||
    document.querySelector(c2).getAttribute("x") * 1;
  let y2 =
    document.querySelector(c2).getAttribute("y") * 1 ||
    document.querySelector(c2).getAttribute("cy") * 1;

  SVG(document.getElementById("cir-connetors"))
    .path()
    .M({
      x: x1,
      y: y1,
    })
    .L({
      x: x2,
      y: y2,
    })
    .attr("id", "newId")
    .fill("none");
}

// ============================================================================
// (mian - page) >>> ;
if (document.getElementById("main-page")) {
  // circles_Connection(".c25", ".c26");
  // circles_Connection(".c25", ".c27");
  // circles_Connection(".c25", ".c28");
  // circles_Connection(".c25", ".c32");
  // circles_Connection(".NO-main-shape", ".W-main-shape");
  // circles_Connection(".NO-main-shape", ".c35");
  circles_Connection(".c333", ".c444");
  circles_Connection_02(".c333", ".c444");
  // circles_Connection(".c333", ".c39");
}

// ============================================================================

// var svg = InteractiveSVG.create("main-svg", 1000, 470);
// // Define points A and B in different ways
// svg.addPoint({ label: "A", x: 40, y: 75 });

// svg.addPoint({ label: "B", x: 160, y: 75 });

// // Add line from A to B
// svg.addLine({ p1: "A", p2: "B" });

// ============================================================================
// function To show  Which side does the link belong to  (التبعية).
function showTooltip(evt, text) {
  let tooltip = document.getElementById("tooltip");
  tooltip.innerHTML = text;
  tooltip.style.display = "block";
  tooltip.style.left = evt.pageX + 10 + "px";
  tooltip.style.top = evt.pageY - 100 + "px";
}

function hideTooltip() {
  var tooltip = document.getElementById("tooltip");
  tooltip.style.display = "none";
}
// ============================================================================
var cables = [
  {
    name: "cable 1",
    tubes: [
      {
        color: "white",
        hairs: [
          {
            color: "blue",
          },
          {
            color: "gorge",
          },
        ],
      },
    ],
  },

  {
    name: "cable 1",
    tubes: [
      {
        color: "white",
        hairs: [
          {
            color: "blue",
          },
          {
            color: "gorge",
          },
          {
            color: "blue",
          },
          {
            color: "gorge",
          },
          {
            color: "blue",
          },
          {
            color: "gorge",
          },
          {
            color: "blue",
          },
          {
            color: "gorge",
          },
          {
            color: "blue",
          },
          {
            color: "gorge",
          },
          {
            color: "blue",
          },
          {
            color: "gorge",
          },
        ],
      },
      {
        color: "white",
        hairs: [
          {
            color: "blue",
          },
          {
            color: "gorge",
          },
        ],
      },
      {
        color: "white",
        hairs: [
          {
            color: "blue",
          },
          {
            color: "gorge",
          },
        ],
      },
      {
        color: "white",
        hairs: [
          {
            color: "blue",
          },
          {
            color: "gorge",
          },
        ],
      },
      {
        color: "white",
        hairs: [
          {
            color: "blue",
          },
          {
            color: "gorge",
          },
        ],
      },
    ],
  },
];
// ============================================================================
if (document.getElementById("Jont-page")) {
  // Start  Bottom Cables
  var cord_x = 200;
  var cord_y = 430;
  var k = 6;

  cables.forEach((cable, index) => {
    cord_x = (index + 1) * 200;

    // open borders for cable
    SVG(document.querySelector(".all-cables"))
      .path()
      .M({
        x: cord_x,
        y: cord_y,
      })
      .v(200)
      .attr("id", "StartCable")
      .attr("stroke", "black")
      .attr("stroke-width", "1");

    // tubes
    cable.tubes.forEach((tube, index1) => {
      SVG(document.querySelector(".all-cables"))
        .path()
        .M({
          x: cord_x + (index1 + 0.1) * 15,
          y: cord_y + 5,
        })
        .h(13)
        .v(200)
        .h(-13)
        .v(-200)
        .attr("id", "tube")
        .attr("stroke", "red")
        .attr("stroke-width", "0.4");
      // hairs
      tube.hairs.forEach((hair, index2) => {
        SVG(document.querySelector(".all-cables"))
          .path()
          .M({
            x: cord_x + (index2 * 0.054 + 0.1) * 20,
            y: cord_y + 7,
          })
          .v(200)
          .attr("id", "hair")
          .attr("stroke", "blue")
          .attr("stroke-width", "0.3");
      });
    });

    // close borders for cable
    SVG(document.querySelector(".all-cables"))
      .path()
      .M({
        x: cord_x + (cable.tubes.length + 0.1) * 15 + 0.1,
        y: cord_y,
      })
      .v(200)
      .attr("id", "EndCable")
      .attr("stroke", "black")
      .attr("stroke-width", "1");
  });
  // End  Bottom Cables

  // ============================================================================
  // Start TOP Cables

  var cord_x = 200;
  var cord_y = 40;
  var k = 6;

  cables.forEach((cable, index) => {
    cord_x = (index + 1) * 200;
    // open borders for cable
    SVG(document.querySelector(".all-cables"))
      .path()
      .M({
        x: cord_x,
        y: cord_y,
      })
      .v(-100)
      .attr("id", "startcable")
      .attr("stroke", "black")
      .attr("stroke-width", "1");

    // tubes
    cable.tubes.forEach((tube, index1) => {
      SVG(document.querySelector(".all-cables"))
        .path()
        .M({
          x: cord_x + (index1 + 0.1) * 15,
          y: cord_y - 5,
        })
        .h(13)
        .v(-100)
        .h(-13)
        .v(100)
        .attr("id", "tube")
        .attr("stroke", "red")
        .attr("stroke-width", "0.4");

      // hairs
      tube.hairs.forEach((hair, index2) => {
        SVG(document.querySelector(".all-cables"))
          .path()
          .M({
            x: cord_x + (index2 * 0.054 + 0.1) * 20,
            y: cord_y - 7,
          })
          .v(-100)
          .attr("id", "hair")
          .attr("stroke", "blue")
          .attr("stroke-width", "0.3");
      });
    });

    // close borders for cable
    SVG(document.querySelector(".all-cables"))
      .path()
      .M({
        x: cord_x + (cable.tubes.length + 0.1) * 15 + 0.1,
        y: cord_y,
      })
      .v(-100)
      .attr("id", "EndCable")
      .attr("stroke", "black")
      .attr("stroke-width", "1");
  });
  // End TOP Cables

  // ============================================================================
  // Start Right Cables

  var right_cord_x = 810;
  var right_cord_y = 50;
  var k = 6;

  cables.forEach((cable, index) => {
    right_cord_y = (index + 1) * 50;
    // open borders for cable
    SVG(document.querySelector(".all-cables"))
      .path()
      .M({
        x: right_cord_x,
        y: right_cord_y,
      })
      .h(300)
      .attr("id", "startcable")
      .attr("stroke", "black")
      .attr("stroke-width", "1");

    // tubes
    cable.tubes.forEach((tube, index1) => {
      SVG(document.querySelector(".all-cables"))
        .path()
        .M({
          x: right_cord_x + 5,
          y: right_cord_y + (index1 + 0.1) * 15,
        })
        .v(13)
        .h(300)
        .v(-13)
        .h(-300)
        .attr("id", "tube")
        .attr("stroke", "red")
        .attr("stroke-width", "0.4");

      // hairs
      tube.hairs.forEach((hair, index2) => {
        SVG(document.querySelector(".all-cables"))
          .path()
          .M({
            x: right_cord_x + 7,
            y: right_cord_y + (index2 * 0.054 + 0.1) * 20,
          })
          .h(300)
          .attr("id", "hair")
          .attr("stroke", "blue")
          .attr("stroke-width", "0.3");
      });
    });
    // close borders for cable
    SVG(document.querySelector(".all-cables"))
      .path()
      .M({
        x: right_cord_x,
        y: right_cord_y + (cable.tubes.length + 0.1) * 15 + 0.1,
      })
      .h(300)
      .attr("id", "endcable")
      .attr("stroke", "black")
      .attr("stroke-width", "1");
  });
  // End Right Cables

  // ============================================================================
  // Satrt Left Cables
  var Left_cord_x = 170;
  var Left_cord_y = 50;
  var k = 6;

  cables.forEach((cable, index) => {
    Left_cord_y = (index + 1) * 50;
    // open borders for cable
    SVG(document.querySelector(".all-cables"))
      .path()
      .M({
        x: Left_cord_x,
        y: Left_cord_y,
      })
      .h(-300)
      .attr("id", "startcable")
      .attr("stroke", "black")
      .attr("stroke-width", "1");

    // tubes
    cable.tubes.forEach((tube, index1) => {
      SVG(document.querySelector(".all-cables"))
        .path()
        .M({
          x: Left_cord_x - 5,
          y: Left_cord_y + (index1 + 0.1) * 15,
        })
        .v(13)
        .h(-300)
        .v(-13)
        .h(300)
        .attr("id", "tube")
        .attr("stroke", "red")
        .attr("stroke-width", "0.4");

      // hairs
      tube.hairs.forEach((hair, index2) => {
        SVG(document.querySelector(".all-cables"))
          .path()
          .M({
            x: Left_cord_x - 7,
            y: Left_cord_y + (index2 * 0.054 + 0.1) * 20,
          })
          .h(-300)
          .attr("id", "hair")
          .attr("stroke", "blue")
          .attr("stroke-width", "0.3");
      });
    });
    // close borders for cable
    SVG(document.querySelector(".all-cables"))
      .path()
      .M({
        x: Left_cord_x,
        y: Left_cord_y + (cable.tubes.length + 0.1) * 15 + 0.1,
      })
      .h(-300)
      .attr("id", "endcable")
      .attr("stroke", "black")
      .attr("stroke-width", "1");
  });
  // End Left Cables
  // ============================================================================
}
