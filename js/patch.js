let editBTN = document.getElementById("enable-edits");
let SaveBTN = document.getElementById("Save-edits");
SaveBTN.disabled = true;

function init() {
  const $ = go.GraphObject.make;

  myDiagram = $(go.Diagram, "myDiagramDiv", {
    initialContentAlignment: go.Spot.Center, // for v1.*
    initialScale: 1,

    "undoManager.isEnabled": true,
    "linkingTool.direction": go.LinkingTool.ForwardsOnly,
    ModelChanged: (e) => {
      // just for demonstration purposes,
      if (e.isTransactionFinished) {
        editBTN.onclick = function () {
          Swal.fire({
            title:
              "يمكنك التعديل على الشكل يرجى الضغط على  حفظ التعديلات بعد الانتهاء من التعديل",
            showCancelButton: true,
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              // Enable diagram editing
              myDiagram.isReadOnly = false;
              SaveBTN.disabled = false;
              SaveBTN.onclick = function () {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "تم حفظ التعديلات",
                  showConfirmButton: false,
                  timer: 1500,
                });
                console.log(e.model.toJson());
                // disable diagram editing
                myDiagram.isReadOnly = true;
                SaveBTN.disabled = true;
              };
            }
          });
        };
      }
    },
  });

  myDiagram.nodeTemplate = $(
    go.Node,
    "Table",
    new go.Binding("location", "location", go.Point.parse).makeTwoWay(
      go.Point.stringify
    ),
    {
      selectionObjectName: "BODY",
      linkValidation: (fromnode, fromport, tonode, toport, link) => {
        if (!fromport || !toport) return false;
        if (fromnode === tonode) {
          // inside a node must go from an input port to an output port
          return fromport.portId[0] === "i" && toport.portId[0] === "o";
        } else {
          // between nodes the port colors must match
          if (fromport.fill !== toport.fill) return false;
          // between nodes must go from an output port to an input port
          return fromport.portId[0] === "o" && toport.portId[0] === "i";
        }
        return true;
      },
    },

    $(go.RowColumnDefinition, {
      column: 1,
      width: 1,
    }),
    $(go.Shape, {
      name: "BODY",
      row: 0,
      rowSpan: 2,
      column: 0,
      columnSpan: 3,
      stretch: go.GraphObject.Fill,
      //   fill: "gray",
      fill: "#aeb5af",
      strokeWidth: 0,
      margin: new go.Margin(0, 8),
    }),
    $(
      go.TextBlock,
      {
        row: 0,
        columnSpan: 3,
        margin: new go.Margin(4, 2, 2, 2),
      },
      new go.Binding("text")
    ),
    $(
      go.TextBlock,
      {
        row: 2,
        columnSpan: 3,
        margin: new go.Margin(4, 2, 2, 2),
      },
      new go.Binding("text", "text2")
    ),

    $(go.Panel, "Table", new go.Binding("itemArray", "inPorts"), {
      row: 1,
      column: 0,
      defaultSeparatorPadding: new go.Margin(4, 0),
      // input ports
      itemTemplate: $(
        go.Panel,
        "TableRow",
        {
          background: "white",
        },
        $(
          go.Shape,
          {
            width: 6,
            height: 6,
            strokeWidth: 0,
            margin: new go.Margin(2, 6, 2, 0),
            fromSpot: go.Spot.Right,
            toSpot: go.Spot.Left,
            fromLinkable: true,
            toLinkable: true,
            fromLinkableSelfNode: true,
            toLinkableSelfNode: true,
            cursor: "pointer",
          },
          new go.Binding("portId", "row", (r) => "i" + r).ofObject(),
          new go.Binding("fill", "", convertToColor)
        )
      ),
    }),
    $(go.Shape, {
      row: 1,
      column: 1,
      fill: "white",
      strokeWidth: 0,
      stretch: go.GraphObject.Fill,
    }),
    $(go.Panel, "Table", new go.Binding("itemArray", "outPorts"), {
      row: 1,
      column: 2,
      defaultSeparatorPadding: new go.Margin(4, 0),
      // output ports
      itemTemplate: $(
        go.Panel,
        "TableRow",
        {
          background: "white",
        },
        $(
          go.Shape,
          {
            width: 6,
            height: 6,
            strokeWidth: 0,
            margin: new go.Margin(2, 0, 2, 6),
            fromSpot: go.Spot.Right,
            toSpot: go.Spot.Left,
            fromLinkable: true,
            toLinkable: true,
            fromLinkableSelfNode: true,
            toLinkableSelfNode: true,
            cursor: "pointer",
          },
          new go.Binding("portId", "row", (r) => "o" + r).ofObject(),
          new go.Binding("fill", "", convertToColor)
        )
      ),
    })
  );

  function convertToColor(n) {
    switch (n) {
      case "r":
        return "brown";
      case "g":
        return "olivedrab";
      case "b":
        return "cornflowerblue";
      default:
        return "black";
    }
  }

  myDiagram.linkTemplate = $(
    go.Link,
    {
      relinkableFrom: true,
      relinkableTo: true,
    },
    $(
      go.Shape,
      {
        strokeWidth: 1,
      },
      new go.Binding("stroke", "fromPort", (p) => p.fill).ofObject()
    )
  );

  //  ========= Get data from patch.json File
  jQuery.getJSON("patch.json", load);
  function load(jsondata) {
    myDiagram.model = new go.GraphLinksModel({
      class: jsondata["class"],
      copiesArrays: jsondata["copiesArrays"],
      copiesArrayObjects: jsondata["copiesArrayObjects"],
      linkFromPortIdProperty: jsondata["linkFromPortIdProperty"],
      linkToPortIdProperty: jsondata["linkToPortIdProperty"],
      nodeDataArray: jsondata["nodeDataArray"],
      linkDataArray: jsondata["linkDataArray"],
    });
  }

  // disable diagram editing
  myDiagram.isReadOnly = true;
}

window.addEventListener("DOMContentLoaded", init);
// ===================================================

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
// =================================================== // Start Test json compare

// function diff(obj1, obj2) {
//   const result = {};
//   if (Object.is(obj1, obj2)) {
//     return undefined;
//   }
//   if (!obj2 || typeof obj2 !== "object") {
//     return obj2;
//   }
//   Object.keys(obj1 || {})
//     .concat(Object.keys(obj2 || {}))
//     .forEach((key) => {
//       if (obj2[key] !== obj1[key] && !Object.is(obj1[key], obj2[key])) {
//         result[key] = obj2[key];
//       }
//       if (typeof obj2[key] === "object" && typeof obj1[key] === "object") {
//         const value = diff(obj1[key], obj2[key]);
//         if (value !== undefined) {
//           result[key] = value;
//         }
//       }
//     });
//   return result;
// }

// obj1 = { a: 1, b: 2 };
// obj2 = { a: 1, b: 5, c: 6 };

// console.log(diff(obj1, obj2));

// ================
// async function get(jsonfile) {
//   const response = await fetch(jsonfile);
//   const data = await response.json();
//   // console.log(data);
//   return data;
// }

// obj2 = get("patch.json");

// =================================================== // End Test json compare
