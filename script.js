const container = document.getElementById('spreadsheet');
const MAX_ROWS = 300;
const MAX_COLS = 26;

// Spreadsheet build

const colHeaderRow = document.createElement('div');
colHeaderRow.className = 'rows';
const filler = document.createElement('div');
filler.id = 'filler';
filler.className = 'col-header';
colHeaderRow.append(filler);
for(let i = 0; i < MAX_COLS; i++)
{
    const colHeader = document.createElement('div');
    colHeader.className = 'extra';
    colHeader.classList.add('col-header');
    colHeader.innerText = String.fromCharCode(65 + i);
    colHeaderRow.append(colHeader);
}
container.append(colHeaderRow);

for(let i = 0; i < MAX_ROWS; i++)
{
    const rowHeader = document.createElement('div');
    rowHeader.className = 'row-header';
    rowHeader.innerText = i + 1;

    let row = document.createElement('div');
    row.className = 'rows';
    row.append(rowHeader);
    for(let j = 0; j < MAX_COLS; j++)
    {
        const cell = document.createElement('div');
        cell.id = `${String.fromCharCode(65 + j)}${i + 1}`
        cell.className = 'cell';
        cell.contentEditable = 'true';
        // cell.innerText = cell.id;

        cell.addEventListener('focus', (e) => {
            const targetCell = e.target;
            targetCell.classList.add('cell-focus');
        })
        cell.addEventListener('blur', (e) => {
            const targetCell = e.target;
            targetCell.classList.remove('cell-focus');
        })

        cell.addEventListener('click', handleCellClick);

        row.append(cell);
    }
    container.append(row);
}

// Selecting cells

const selectedCells = new Set();

function handleCellClick(e)
{
    const targetCell = e.target;
    if(!e.ctrlKey && !e.metaKey) // For windows as well as mac
    {
        selectedCells.forEach(cell => cell.classList.remove('selected-cell'));
        selectedCells.clear();
        targetCell.classList.add('selected-cell');
        selectedCells.add(targetCell);
    }
    else if(selectedCells.has(targetCell))
    {
        targetCell.classList.remove('selected-cell');
        selectedCells.delete(targetCell);
    }
    else
    {
        targetCell.classList.add('selected-cell');
        selectedCells.add(targetCell);
    }
}

document.getElementById('filler').addEventListener('click', () => {
    selectedCells.forEach((cell) => {
        cell.classList.remove('selected-cell');
    })
    selectedCells.clear();
})

// Effects

function makeBold()
{
    if(selectedCells.size == 0)
    {
        allCells.forEach((cell) => {
            cell.style.fontWeight = cell.style.fontWeight == 'bold' ? 'normal' : 'bold';
        })
        return;
    }
    selectedCells.forEach((cell) => {
        cell.style.fontWeight = cell.style.fontWeight == 'bold' ? 'normal' : 'bold';
    })
}
function makeItalic()
{
    if(selectedCells.size == 0)
    {
        allCells.forEach((cell) => {
            cell.style.fontStyle = cell.style.fontStyle == 'italic' ? 'normal' : 'italic';
        })
        return;
    }
    selectedCells.forEach((cell) => {
        cell.style.fontStyle = cell.style.fontStyle == 'italic' ? 'normal' : 'italic';
    })
}
function makeUnderline()
{
    if(selectedCells.size == 0)
    {
        allCells.forEach((cell) => {
            cell.style.textDecoration = cell.style.textDecoration == 'underline' ? 'none' : 'underline';
        })
        return;
    }
    selectedCells.forEach((cell) => {
        cell.style.textDecoration = cell.style.textDecoration == 'underline' ? 'none' : 'underline';
    })
}

const allCells = container.querySelectorAll('.cell');
const txtColor = document.getElementById('text');
const bgColor = document.getElementById('bg');
function changeTxtColor()
{
    if(selectedCells.size == 0)
    {
        allCells.forEach((cell) => {
            cell.style.color = txtColor.value;
        })
        return;
    }
    selectedCells.forEach((cell) => {
        cell.style.color = txtColor.value;
    })
}
function changeBgColor()
{
    if(selectedCells.size == 0)
    {
        allCells.forEach((cell) => {
            cell.style.backgroundColor = bgColor.value;
        })
        return;
    }
    selectedCells.forEach((cell) => {
        cell.style.backgroundColor = bgColor.value;
    })
}

const alignMenu = document.getElementById('align');
function changeAlign()
{
    if(selectedCells.size == 0)
    {
        allCells.forEach((cell) => {
            cell.style.textAlign = alignMenu.value;
        })
        return;
    }
    selectedCells.forEach((cell) => {
        cell.style.textAlign = alignMenu.value;
    })
}

const fontFamMenu = document.getElementById('font');
function changeFont()
{
    if(selectedCells.size == 0)
    {
        allCells.forEach((cell) => {
            cell.style.fontFamily = fontFamMenu.value;
        })
        return;
    }
    selectedCells.forEach((cell) => {
        cell.style.fontFamily = fontFamMenu.value;
    })
}

function clearSelection()
{
    if(selectedCells.size == 0)
    {
        allCells.forEach((cell) => {
            cell.innerText = '';
        })
        return;
    }
    selectedCells.forEach((cell) => {
        cell.innerText = '';
        cell.classList.remove('selected-cell');
    })
    selectedCells.clear();
}

document.addEventListener('keydown', (e) => {
    if(e.key == 'Delete')
    {
        clearSelection();
    }
})

// const plusSize = document.getElementById('increase');
// const minusSize = document.getElementById('decrease');

// plusSize.addEventListener('click', () => {
//     const init_Width = allCells[0].style.width;
//     const init_Height = allCells[0].style.height;
//     console.log()

//     // container.style.cssText = `
//     //     grid-template-columns: 50px repeat(26, 1fr);
//     //     grid-template-rows: repeat(20, px);
//     // `;
// })