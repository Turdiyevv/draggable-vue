import { computed, ref } from 'vue'

const locale = ref(localStorage.getItem('locale') || 'uz')

export const localeOptions = [
  { label: 'UZ', value: 'uz' },
  { label: 'RU', value: 'ru' },
  { label: 'EN', value: 'en' },
]

const messages = {
  uz: {
    nav: { info: "Ma'lumotlarim", infoCaption: "Shaxsiy ma'lumotlar", tasks: 'Vazifalarim', tasksCaption: 'Vazifalar boshqaruvi', discord: 'Discord chat', discordCaption: 'Chat kanali' },
    auth: { username: 'Foydalanuvchi nomi', password: 'Parol', submit: 'Kirish', loginSuccess: 'Tizimga muvaffaqiyatli kirildi' },
    profile: { username: 'Foydalanuvchi nomi', age: 'Yosh', region: 'Hudud', profession: 'Kasb', edit: 'Tahrirlash', save: 'Saqlash', changed: "Ma'lumotlar o'zgartirildi" },
    tasks: { selectType: 'Turni tanlang', dateFilter: 'Sana filtri', ok: 'OK', all: 'Barcha vazifalar', clear: 'Filtrni tozalash', add: 'Vazifa qo\'shish', updated: 'Vazifa yangilandi', updateError: 'Vazifani yangilab bo\'lmadi', added: 'Vazifa qo\'shildi', addError: 'Vazifani qo\'shib bo\'lmadi', deleted: 'Vazifa o\'chirildi', deleteError: 'Vazifani o\'chirib bo\'lmadi' },
    status: { registered: "Ro'yxatdan o'tgan", process: 'Jarayonda', completed: 'Tugallangan', testing: 'Test qilinmoqda', verified: 'Tasdiqlangan' },
    type: { high: 'Yuqori', normal: 'Oddiy', low: 'Past' },
    dialog: { edit: 'Tahrirlash', create: 'Yaratish', user: 'Foydalanuvchi', taskTitle: 'Vazifa nomi', description: 'Tavsif', deadline: 'Muddat', save: 'Saqlash' },
    validation: { required: 'Maydonni to\'ldiring' },
    error: { title: 'Bu yerda hech narsa yo\'q...', home: 'Bosh sahifa' },
  },
  ru: {
    nav: { info: 'Мои данные', infoCaption: 'Личные данные', tasks: 'Мои задачи', tasksCaption: 'Управление задачами', discord: 'Discord чат', discordCaption: 'Канал чата' },
    auth: { username: 'Имя пользователя', password: 'Пароль', submit: 'Войти', loginSuccess: 'Вход выполнен успешно' },
    profile: { username: 'Имя пользователя', age: 'Возраст', region: 'Регион', profession: 'Профессия', edit: 'Изменить', save: 'Сохранить', changed: 'Данные изменены' },
    tasks: { selectType: 'Выберите тип', dateFilter: 'Фильтр по дате', ok: 'ОК', all: 'Все задачи', clear: 'Очистить фильтр', add: 'Добавить задачу', updated: 'Задача обновлена', updateError: 'Не удалось обновить задачу', added: 'Задача добавлена', addError: 'Не удалось добавить задачу', deleted: 'Задача удалена', deleteError: 'Не удалось удалить задачу' },
    status: { registered: 'Зарегистрировано', process: 'В процессе', completed: 'Завершено', testing: 'Тестирование', verified: 'Проверено' },
    type: { high: 'Высокий', normal: 'Обычный', low: 'Низкий' },
    dialog: { edit: 'Изменить', create: 'Создать', user: 'Пользователь', taskTitle: 'Название задачи', description: 'Описание', deadline: 'Срок', save: 'Сохранить' },
    validation: { required: 'Заполните поле' },
    error: { title: 'Здесь ничего нет...', home: 'На главную' },
  },
  en: {
    nav: { info: 'My info', infoCaption: 'Personal information', tasks: 'My tasks', tasksCaption: 'Task management', discord: 'Discord chat', discordCaption: 'Chat channel' },
    auth: { username: 'Username', password: 'Password', submit: 'Submit', loginSuccess: 'Login successful' },
    profile: { username: 'Username', age: 'Age', region: 'Region', profession: 'Profession', edit: 'Edit', save: 'Save', changed: 'Information changed' },
    tasks: { selectType: 'Select type', dateFilter: 'Date filter', ok: 'OK', all: 'All tasks', clear: 'Clear filter', add: 'Add task', updated: 'Task updated', updateError: 'Task could not be updated', added: 'Task added', addError: 'Task could not be added', deleted: 'Task deleted', deleteError: 'Task could not be deleted' },
    status: { registered: 'Registered', process: 'In process', completed: 'Completed', testing: 'Testing', verified: 'Verified' },
    type: { high: 'High', normal: 'Normal', low: 'Low' },
    dialog: { edit: 'Edit', create: 'Create', user: 'User', taskTitle: 'Task title', description: 'Description', deadline: 'Deadline', save: 'Save' },
    validation: { required: 'Please type something' },
    error: { title: 'Oops. Nothing here...', home: 'Go Home' },
  },
}

export function useI18n() {
  const t = (key) => key.split('.').reduce((value, part) => value?.[part], messages[locale.value]) || key
  const setLocale = (value) => {
    if (!messages[value]) return
    locale.value = value
    localStorage.setItem('locale', value)
  }

  return { locale, localeOptions, t, setLocale, currentLocale: computed(() => locale.value) }
}
