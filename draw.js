// const canvas = new fabric.Canvas('canvas');
// let copiedObjects = null;
// canvas.setWidth(window.innerWidth);
// canvas.setHeight(window.innerHeight - 60);

// const wrapper = document.querySelector(".canvas-container");
// let canvasHeight = canvas.getHeight();

// // --- NEW: State to track highlighter mode ---
// let isHighlighter = false;

// function handleScroll() {
//   const scrollPosition = wrapper.scrollTop + wrapper.clientHeight;
//   const scrollHeight = wrapper.scrollHeight;
//   if (scrollHeight - scrollPosition < 50) {
//     canvasHeight += 250;
//     canvas.setHeight(canvasHeight);
//     canvas.getElement().style.height = canvasHeight + "px";
//     canvas.requestRenderAll();
//   }
// }

// wrapper.addEventListener('scroll', handleScroll);
// wrapper.addEventListener('touchmove', handleScroll);

// // Fixed SVG XML structure for the cursor
// const squareCursor = 'data:image/svg+xml;base64,' + btoa(`
//   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
//     <rect width="16" height="16" style="fill:none;stroke:black;stroke-width:1" />
//   </svg>`);

// let selected_clr = 'black';
// const colorPicker = document.querySelector('.color-picker');

// // --- Helper to convert Hex to RGBA for transparency ---
// function hexToRgba(hex, alpha) {
//   let r = parseInt(hex.slice(1, 3), 16);
//   let g = parseInt(hex.slice(3, 5), 16);
//   let b = parseInt(hex.slice(5, 7), 16);
//   return `rgba(${r},${g},${b},${alpha})`;
// }

// // --- UPDATED: Color Picker Logic ---
// colorPicker.addEventListener('input', (e) => {
//   selected_clr = e.target.value;
  
//   // If we are in highlighter mode, apply transparency immediately
//   if (isHighlighter) {
//     canvas.freeDrawingBrush.color = hexToRgba(selected_clr, 0.4);
//   } else {
//     canvas.freeDrawingBrush.color = selected_clr;
//   }
//   Properties();
// });

// let line;
// let mousedwn = false;

// function switchoffline() {
//   canvas.off('mouse:down', startAddingLine);
//   canvas.off('mouse:move', startDrawingLine);
//   canvas.off('mouse:up', stopDrawingLine);
//   canvas.off('mouse:down');
// }

// function updateFontSize(size) {
//   const active = canvas.getActiveObject();
//   if (!active) return;
  
//   if (['text', 'textbox', 'i-text'].includes(active.type)) {
//     active.set('fontSize', parseInt(size, 10));
//     canvas.requestRenderAll();
//   }
// }

// function addText() {
//   isHighlighter = false; // Reset highlighter
//   const text = new fabric.IText('Type here', {
//     left: 100,
//     top: 100,
//     fontFamily: 'Arial',
//     fill: selected_clr,
//     fontSize: 24,
//     editable: true
//   });
//   canvas.add(text);
//   canvas.setActiveObject(text);
//   canvas.requestRenderAll();
// }

// function startAddingLine(pos) {
//   mousedwn = true;
//   let ptr = canvas.getPointer(pos.e);
//   line = new fabric.Line([ptr.x, ptr.y, ptr.x, ptr.y], {
//     stroke: selected_clr,
//     strokeWidth: 5,
//     selectable: true,
//     evented: true
//   })
//   canvas.add(line);
//   canvas.requestRenderAll();
// }

// function startDrawingLine(pos) {
//   if (mousedwn) {
//     let ptr = canvas.getPointer(pos.e);
//     line.set({
//       x2: ptr.x,
//       y2: ptr.y
//     });
//     canvas.requestRenderAll();
//   }
// }

// function stopDrawingLine() {
//   mousedwn = false;
// }

// function erase() {
//   isHighlighter = false; // Reset highlighter
//   switchoffline();
//   canvas.defaultCursor = squareCursor;
//   canvas.isDrawingMode = false;
//   canvas.selection = false;
//   canvas.perPixelTargetFind = true;
//   canvas.targetFindTolerance = 18;
//   canvas.forEachObject(obj => {
//     obj.selectable = false;
//     obj.evented = true;
//   });
//   canvas.on('mouse:down', function (e) {
//     if (e.target) {
//       canvas.remove(e.target);
//       canvas.requestRenderAll();
//     }
//   });
// }

// function drawline() {
//   isHighlighter = false; // Reset highlighter
//   canvas.isDrawingMode = false;
//   canvas.selection = false;
//   canvas.on('mouse:down', startAddingLine);
//   canvas.on('mouse:move', startDrawingLine);
//   canvas.on('mouse:up', stopDrawingLine);
//   canvas.forEachObject(obj => obj.selectable = false);
// }

// function cursor() {
//   isHighlighter = false; // Reset highlighter
//   canvas.isDrawingMode = false;
//   canvas.selection = true;
//   canvas.defaultCursor = 'pointer';
//   canvas.forEachObject(obj => obj.selectable = true);
//   switchoffline();
// }

// // --- UPDATED: Pencil Function ---
// function pencil() {
//   isHighlighter = false; // Turn off highlighter mode
//   canvas.isDrawingMode = true;
//   canvas.freeDrawingBrush = new fabric.PencilBrush(canvas); // Reset brush
//   canvas.freeDrawingBrush.width = 3;
//   canvas.freeDrawingBrush.color = selected_clr; // Ensure solid color
//   switchoffline();
// }

// // --- NEW: Highlighter Function ---
// function highlighter() {
//   isHighlighter = true;
//   canvas.isDrawingMode = true;
//   switchoffline();

//   // Setup highlighter brush style
//   canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
//   canvas.freeDrawingBrush.width = 25; // Thicker for highlighter
//   // Convert current selected color to transparent (Opacity 0.4)
//   canvas.freeDrawingBrush.color = hexToRgba(selected_clr, 0.4);
// }

// // --- NEW: Logic to remove highlighted lines on Pen Up ---
// canvas.on('path:created', function(opt) {
//   if (isHighlighter) {
//     // Determine if we should remove specifically this line or all.
//     // Based on "when pen up all highlighted lines removes", 
//     // we remove the path that was just finished.
//     const path = opt.path;
//     canvas.remove(path);
//     canvas.requestRenderAll();
//   }
// });

// function rhombus() {
//   isHighlighter = false;
//   const rhm = new fabric.Rect({
//     left: 100,
//     top: 100,
//     fill: selected_clr,
//     width: 20,
//     height: 20,
//     angle: 45
//   });
//   canvas.add(rhm);
//   switchoffline();
// }

// function drawRect() {
//   isHighlighter = false;
//   const rect = new fabric.Rect({
//     left: 100,
//     top: 100,
//     fill: selected_clr,
//     width: 35,
//     height: 60
//   });
//   canvas.add(rect);
//   canvas.isDrawingMode = false;
//   switchoffline();
// }

// function drawSqr() {
//   isHighlighter = false;
//   const sqr = new fabric.Rect({
//     left: 250,
//     top: 100,
//     height: 50,
//     width: 50,
//     fill: selected_clr
//   });
//   canvas.add(sqr);
//   canvas.isDrawingMode = false;
//   switchoffline();
// }

// function drawCircle() {
//   isHighlighter = false;
//   const circle = new fabric.Circle({
//     left: 250,
//     top: 100,
//     radius: 50,
//     fill: selected_clr
//   });
//   canvas.add(circle);
//   canvas.isDrawingMode = false;
//   switchoffline();
// }

// function drawTriangle() {
//   isHighlighter = false;
//   const triangle = new fabric.Triangle({
//     left: 150,
//     top: 150,
//     width: 100,
//     height: 100,
//     fill: selected_clr,
//   });
//   canvas.add(triangle);
//   canvas.isDrawingMode = false;
//   switchoffline();
// }

// function drawRightAngleTriangle() {
//   isHighlighter = false;
//   const triangle = new fabric.Polygon([
//     { x: 0, y: 0 },
//     { x: 0, y: 100 },
//     { x: 100, y: 100 }
//   ], {
//     left: 250,
//     top: 180,
//     fill: selected_clr,
//     stroke: selected_clr,
//     strokeWidth: 1
//   });
//   canvas.add(triangle);
//   canvas.isDrawingMode = false;
//   switchoffline();
// }

// function Copy() {
//   const active = canvas.getActiveObject();
//   if (active) {
//     if (active.type === 'activeSelection') {
//       active.clone(clone => {
//         copiedObjects = clone;
//       }, ['left', 'top', 'scaleX', 'scaleY', 'angle', 'originX', 'originY']);
//     } else {
//       active.clone(clone => {
//         copiedObjects = clone;
//       });
//     }
//   }
// }

// function Paste() {
//   if (copiedObjects) {
//     copiedObjects.clone(clone => {
//       canvas.discardActiveObject();
//       clone.set({
//         left: clone.left + 20,
//         top: clone.top + 20
//       });
//       if (clone.type === 'activeSelection') {
//         clone.canvas = canvas;
//         clone.forEachObject(obj => canvas.add(obj));
//         clone.setCoords();
//       } else {
//         canvas.add(clone);
//       }
//       canvas.setActiveObject(clone);
//       canvas.requestRenderAll();
//     });
//   }
// }

// function Properties() {
//   const active = canvas.getActiveObject();
//   if (!active) return;
//   if (active.type === 'activeSelection') {
//     active.forEachObject(obj => {
//       obj.set({ fill: selected_clr });
//     });
//   } else if (active.type === 'group' && active._objects) {
//     active._objects.forEach(obj => {
//       obj.set({ fill: selected_clr });
//     });
//   } else {
//     active.set({ fill: selected_clr });
//   }
//   canvas.renderAll();
// }

// document.body.tabIndex = 0;
// document.body.focus();
// document.addEventListener('keydown', (e) => {
//   if (e.ctrlKey && e.key === 'c') {
//     Copy();
//   }
//   if (e.ctrlKey && e.key === 'v') {
//     Paste();
//   }
// });

const canvas = new fabric.Canvas('canvas');
let copiedObjects = null;
canvas.setWidth(window.innerWidth);
canvas.setHeight(window.innerHeight - 60);

const wrapper = document.querySelector(".canvas-container");
let canvasHeight = canvas.getHeight();

// --- NEW: State to track highlighter mode ---
let isHighlighter = false;

function handleScroll() {
  const scrollPosition = wrapper.scrollTop + wrapper.clientHeight;
  const scrollHeight = wrapper.scrollHeight;
  if (scrollHeight - scrollPosition < 50) {
    canvasHeight += 250;
    canvas.setHeight(canvasHeight);
    canvas.getElement().style.height = canvasHeight + "px";
    canvas.requestRenderAll();
  }
}

wrapper.addEventListener('scroll', handleScroll);
wrapper.addEventListener('touchmove', handleScroll);

// Fixed SVG XML structure for the cursor
const squareCursor = 'data:image/svg+xml;base64,' + btoa(`
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
    <rect width="16" height="16" style="fill:none;stroke:black;stroke-width:1" />
  </svg>`);

let selected_clr = 'black';
const colorPicker = document.querySelector('.color-picker');
const themeToggleButton = document.getElementById('theme-toggle');
let isDarkMode = true;

// --- Helper to convert Hex to RGBA for transparency ---
function hexToRgba(hex, alpha) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function resetCanvasForTheme() {
  canvas.clear();
  canvas.discardActiveObject();
  canvas.isDrawingMode = false;
  canvas.selection = true;
  canvas.setWidth(window.innerWidth);
  canvas.setHeight(window.innerHeight - 60);
  canvas.requestRenderAll();
}

function setTheme(isDark) {
  isDarkMode = isDark;
  const nextColor = isDark ? '#ffffff' : '#000000';

  document.body.classList.toggle('dark-mode', isDark);
  document.body.classList.toggle('light-mode', !isDark);
  themeToggleButton.textContent = isDark ? '☀️' : '🌙';
  themeToggleButton.title = isDark ? 'Switch to White Mode' : 'Switch to Dark Mode';

  selected_clr = nextColor;
  colorPicker.value = nextColor;

  if (canvas.freeDrawingBrush) {
    canvas.freeDrawingBrush.color = isHighlighter
      ? hexToRgba(selected_clr, 0.4)
      : selected_clr;
  }

}

function toggleTheme() {
  resetCanvasForTheme();
  setTheme(!isDarkMode);
}

// --- UPDATED: Color Picker Logic ---
colorPicker.addEventListener('input', (e) => {
  selected_clr = e.target.value;
  
  // If we are in highlighter mode, apply transparency immediately
  if (isHighlighter) {
    canvas.freeDrawingBrush.color = hexToRgba(selected_clr, 0.4);
  } else {
    canvas.freeDrawingBrush.color = selected_clr;
  }
  Properties();
});

let line;
let mousedwn = false;

function switchoffline() {
  canvas.off('mouse:down', startAddingLine);
  canvas.off('mouse:move', startDrawingLine);
  canvas.off('mouse:up', stopDrawingLine);
  canvas.off('mouse:down');
}

function updateFontSize(size) {
  const active = canvas.getActiveObject();
  if (!active) return;
  
  if (['text', 'textbox', 'i-text'].includes(active.type)) {
    active.set('fontSize', parseInt(size, 10));
    canvas.requestRenderAll();
  }
}

function addText() {
  isHighlighter = false; // Reset highlighter
  const text = new fabric.IText('Type here', {
    left: 100,
    top: 100,
    fontFamily: 'Arial',
    fill: selected_clr,
    fontSize: 24,
    editable: true
  });
  canvas.add(text);
  canvas.setActiveObject(text);
  canvas.requestRenderAll();
}

function startAddingLine(pos) {
  mousedwn = true;
  let ptr = canvas.getPointer(pos.e);
  line = new fabric.Line([ptr.x, ptr.y, ptr.x, ptr.y], {
    stroke: selected_clr,
    strokeWidth: 5,
    selectable: true,
    evented: true
  })
  canvas.add(line);
  canvas.requestRenderAll();
}

function startDrawingLine(pos) {
  if (mousedwn) {
    let ptr = canvas.getPointer(pos.e);
    line.set({
      x2: ptr.x,
      y2: ptr.y
    });
    canvas.requestRenderAll();
  }
}

function stopDrawingLine() {
  mousedwn = false;
}

function erase() {
  isHighlighter = false; // Reset highlighter
  switchoffline();
  canvas.defaultCursor = squareCursor;
  canvas.isDrawingMode = false;
  canvas.selection = false;
  canvas.perPixelTargetFind = true;
  canvas.targetFindTolerance = 18;
  canvas.forEachObject(obj => {
    obj.selectable = false;
    obj.evented = true;
  });
  canvas.on('mouse:down', function (e) {
    if (e.target) {
      canvas.remove(e.target);
      canvas.requestRenderAll();
    }
  });
}

function drawline() {
  isHighlighter = false; // Reset highlighter
  canvas.isDrawingMode = false;
  canvas.selection = false;
  canvas.on('mouse:down', startAddingLine);
  canvas.on('mouse:move', startDrawingLine);
  canvas.on('mouse:up', stopDrawingLine);
  canvas.forEachObject(obj => obj.selectable = false);
}

function cursor() {
  isHighlighter = false; // Reset highlighter
  canvas.isDrawingMode = false;
  canvas.selection = true;
  canvas.defaultCursor = 'pointer';
  canvas.forEachObject(obj => obj.selectable = true);
  switchoffline();
}

// --- UPDATED: Pencil Function ---
function pencil() {
  isHighlighter = false; // Turn off highlighter mode
  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush = new fabric.PencilBrush(canvas); // Reset brush
  canvas.freeDrawingBrush.width = 3;
  canvas.freeDrawingBrush.color = selected_clr; // Ensure solid color
  switchoffline();
}

// --- NEW: Highlighter Function ---
function highlighter() {
  isHighlighter = true;
  canvas.isDrawingMode = true;
  switchoffline();

  // Setup highlighter brush style
  canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
  canvas.freeDrawingBrush.width = 25; // Thicker for highlighter
  // Convert current selected color to transparent (Opacity 0.4)
  canvas.freeDrawingBrush.color = hexToRgba(selected_clr, 0.4);
}

// --- NEW: Logic to remove highlighted lines on Pen Up ---
canvas.on('path:created', function(opt) {
  if (isHighlighter) {
    // Determine if we should remove specifically this line or all.
    // Based on "when pen up all highlighted lines removes", 
    // we remove the path that was just finished.
    const path = opt.path;
    canvas.remove(path);
    canvas.requestRenderAll();
  }
});

function rhombus() {
  isHighlighter = false;
  const rhm = new fabric.Rect({
    left: 100,
    top: 100,
    fill: selected_clr,
    width: 20,
    height: 20,
    angle: 45
  });
  canvas.add(rhm);
  switchoffline();
}

function drawRect() {
  isHighlighter = false;
  const rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: selected_clr,
    width: 35,
    height: 60
  });
  canvas.add(rect);
  canvas.isDrawingMode = false;
  switchoffline();
}

function drawSqr() {
  isHighlighter = false;
  const sqr = new fabric.Rect({
    left: 250,
    top: 100,
    height: 50,
    width: 50,
    fill: selected_clr
  });
  canvas.add(sqr);
  canvas.isDrawingMode = false;
  switchoffline();
}

function drawCircle() {
  isHighlighter = false;
  const circle = new fabric.Circle({
    left: 250,
    top: 100,
    radius: 50,
    fill: selected_clr
  });
  canvas.add(circle);
  canvas.isDrawingMode = false;
  switchoffline();
}

function drawTriangle() {
  isHighlighter = false;
  const triangle = new fabric.Triangle({
    left: 150,
    top: 150,
    width: 100,
    height: 100,
    fill: selected_clr,
  });
  canvas.add(triangle);
  canvas.isDrawingMode = false;
  switchoffline();
}

function drawRightAngleTriangle() {
  isHighlighter = false;
  const triangle = new fabric.Polygon([
    { x: 0, y: 0 },
    { x: 0, y: 100 },
    { x: 100, y: 100 }
  ], {
    left: 250,
    top: 180,
    fill: selected_clr,
    stroke: selected_clr,
    strokeWidth: 1
  });
  canvas.add(triangle);
  canvas.isDrawingMode = false;
  switchoffline();
}

function Copy() {
  const active = canvas.getActiveObject();
  if (active) {
    if (active.type === 'activeSelection') {
      active.clone(clone => {
        copiedObjects = clone;
      }, ['left', 'top', 'scaleX', 'scaleY', 'angle', 'originX', 'originY']);
    } else {
      active.clone(clone => {
        copiedObjects = clone;
      });
    }
  }
}

function Paste() {
  if (copiedObjects) {
    copiedObjects.clone(clone => {
      canvas.discardActiveObject();
      clone.set({
        left: clone.left + 20,
        top: clone.top + 20
      });
      if (clone.type === 'activeSelection') {
        clone.canvas = canvas;
        clone.forEachObject(obj => canvas.add(obj));
        clone.setCoords();
      } else {
        canvas.add(clone);
      }
      canvas.setActiveObject(clone);
      canvas.requestRenderAll();
    });
  }
}

function Properties() {
  const active = canvas.getActiveObject();
  if (!active) return;
  if (active.type === 'activeSelection') {
    active.forEachObject(obj => {
      obj.set({ fill: selected_clr });
    });
  } else if (active.type === 'group' && active._objects) {
    active._objects.forEach(obj => {
      obj.set({ fill: selected_clr });
    });
  } else {
    active.set({ fill: selected_clr });
  }
  canvas.renderAll();
}

document.body.tabIndex = 0;
document.body.focus();

document.body.classList.add('dark-mode');
setTheme(true);

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'c') {
    Copy();
  }
  if (e.ctrlKey && e.key === 'v') {
    Paste();
  }
});


