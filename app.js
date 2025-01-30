// Элементы DOM
const noteInput = document.getElementById('noteInput');
const addNoteBtn = document.getElementById('addNoteBtn');
const notesContainer = document.getElementById('notesContainer');

// Загрузка заметок из localStorage
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Функция сохранения заметок
function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Функция создания HTML-элемента заметки
function createNoteElement(note, index) {
    const noteElement = document.createElement('div');
    noteElement.className = 'note';
    noteElement.innerHTML = `
        <p>${note.text}</p>
        <small>${new Date(note.date).toLocaleString()}</small>
        <button class="deleteBtn" onclick="deleteNote(${index})">Удалить</button>
    `;
    return noteElement;
}

// Функция отображения всех заметок
function displayNotes() {
    notesContainer.innerHTML = '';
    notes.forEach((note, index) => {
        notesContainer.appendChild(createNoteElement(note, index));
    });
}

// Добавление новой заметки
addNoteBtn.addEventListener('click', () => {
    const noteText = noteInput.value.trim();
    
    if (noteText) {
        const newNote = {
            text: noteText,
            date: new Date().toISOString()
        };
        
        notes.push(newNote);
        saveNotes();
        displayNotes();
        noteInput.value = '';
    }
});

// Удаление заметки
window.deleteNote = function(index) {
    notes.splice(index, 1);
    saveNotes();
    displayNotes();
};

// Запуск при загрузке страницы
displayNotes();

// Автоматическое увеличение высоты textarea
noteInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
});

// Скрытие клавиатуры при клике вне поля ввода
document.addEventListener('click', function(e) {
    if(e.target !== noteInput) {
        noteInput.blur();
    }
});
