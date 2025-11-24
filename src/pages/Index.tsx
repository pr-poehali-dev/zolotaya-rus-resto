import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const menuItems = {
  cold: [
    { name: 'Овощи свежие (томаты, огурцы, сладкий перец, редис)', price: 650 },
    { name: 'Домашние малосольные овощи (помидоры черри, огурцы, капуста цветная, слива)', price: 700 },
    { name: 'Грибы белые, маринованные', price: 850 },
    { name: 'Блины с мясом (курица, свинина)', price: 1250 },
    { name: 'Блины с щучьей икрой', price: 1650 },
    { name: 'Блины с осетровой икрой', price: 2500 },
    { name: 'Рыбное ассорти', price: 850 },
    { name: 'Мясное ассорти', price: 950 }
  ],
  salads: [
    { name: 'Витаминный салат', price: 750 },
    { name: 'Крестьянский салат', price: 900 },
    { name: 'Винегрет с сельдью', price: 600 },
    { name: 'Салат с копченным палтусом', price: 1100 },
    { name: 'Салат из свежих овощей со сметаной или ароматным маслом', price: 550 },
    { name: 'Императорский салат (оливье)', price: 600 }
  ],
  soups: [
    { name: 'Окрошка с говяжьей вырезкой (на квасе/на кефире)', price: 800 },
    { name: 'Свекольник', price: 700 },
    { name: 'Щи с сырной краюшкой', price: 750 },
    { name: 'Уха из двух видов рыб', price: 725 }
  ],
  hot: [
    { name: 'Ребра говядины запеченные с картофельным пюре и салатом из капусты', price: 1200 },
    { name: 'Голень ягненка запеченная с томленными овощами', price: 1300 },
    { name: 'Мякоть козленка томленная в печи с овощами', price: 900 },
    { name: 'Котлеты куриные с гороховым пюре', price: 1150 }
  ],
  sides: [
    { name: 'Картофель, запеченный в ароматном масле', price: 450 },
    { name: 'Картофельное пюре', price: 400 },
    { name: 'Овощи томленные в томаты', price: 750 },
    { name: 'Квашенная капуста', price: 570 },
    { name: 'Томатный соус', price: 250 },
    { name: 'Хренодер', price: 250 },
    { name: 'Сметана', price: 250 },
    { name: 'Тартар', price: 250 }
  ],
  bakery: [
    { name: 'Пирожок с капустой', price: 300 },
    { name: 'Пирожок с яйцом и зеленым луком', price: 300 },
    { name: 'Пирожок с мясом', price: 300 },
    { name: 'Пирожок с рыбой', price: 300 },
    { name: 'Ватрушка с яблоками', price: 300 },
    { name: 'Ватрушка с творогом и вишней', price: 300 }
  ],
  desserts: [
    { name: 'Малиновый пирог', price: 650 },
    { name: 'Таежный десерт', price: 650 },
    { name: 'Десерт твороженное кольцо', price: 750 },
    { name: 'Пастила из сушеных яблок', price: 650 },
    { name: 'Мороженое (клубника, ваниль)', price: 300 }
  ],
  drinks: [
    { name: 'Вода архыз (с газом/без газа)', price: 250 },
    { name: 'Компот из сухофруктов', price: 300 },
    { name: 'Морс (брусника/клюква)', price: 300 },
    { name: 'Квас', price: 400 },
    { name: 'Чай в ассортименте', price: 450 },
    { name: 'Кофе (экспрессо, американо, капучино, латте)', price: 230 },
    { name: 'Лимонад вишня-бергамот', price: 500 },
    { name: 'Лимонад голубика-черемуха', price: 500 }
  ],
  alcohol: [
    { name: 'Водка чистые росы', price: 550 },
    { name: 'Настойка (малина/вишня)', price: 480 },
    { name: 'Пиво шпатен', price: 550 }
  ]
};

const reviews = [
  { name: 'Елена М.', text: 'Прекрасная атмосфера старой Москвы! Блины с икрой просто тают во рту. Обязательно вернемся!', rating: 5 },
  { name: 'Дмитрий К.', text: 'Настоящая русская кухня! Щи напомнили детство. Порции большие, цены адекватные.', rating: 5 },
  { name: 'Анна С.', text: 'Отличное место для семейного ужина. Персонал внимательный, еда свежая и вкусная.', rating: 5 },
  { name: 'Игорь В.', text: 'Ребра говядины - это что-то невероятное! Мясо отваливается от кости. Рекомендую!', rating: 5 }
];

const galleryImages = [
  'https://cdn.poehali.dev/projects/8af41a73-87d4-40ce-ac9c-32036c0e8b7e/files/f9606a6b-0cee-4f5f-bd27-f2dea1cfa078.jpg',
  'https://cdn.poehali.dev/projects/8af41a73-87d4-40ce-ac9c-32036c0e8b7e/files/1f678c94-fe01-4b08-bc6d-68e6db0b2c2f.jpg',
  'https://cdn.poehali.dev/projects/8af41a73-87d4-40ce-ac9c-32036c0e8b7e/files/41a2dc4a-c601-4904-958a-59c9ee72fc4a.jpg'
];

const Index = () => {
  const [bookingForm, setBookingForm] = useState({ name: '', phone: '', date: '', time: '', guests: '' });

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-dark text-foreground">
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 border-b border-primary/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-primary flex items-center gap-2">
            <span className="text-3xl">🏛️</span> Золотая Русь
          </h1>
          <div className="hidden md:flex gap-6">
            {['home', 'menu', 'about', 'gallery', 'reviews', 'delivery', 'booking', 'contacts'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-sm uppercase tracking-wide hover:text-primary transition-colors"
              >
                {section === 'home' ? 'Главная' : 
                 section === 'menu' ? 'Меню' :
                 section === 'about' ? 'О нас' :
                 section === 'gallery' ? 'Галерея' :
                 section === 'reviews' ? 'Отзывы' :
                 section === 'delivery' ? 'Доставка' :
                 section === 'booking' ? 'Бронирование' : 'Контакты'}
              </button>
            ))}
          </div>
          <Button className="md:hidden">
            <Icon name="Menu" size={24} />
          </Button>
        </div>
      </nav>

      <section id="home" className="relative min-h-screen flex items-center justify-center pt-16">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(26, 31, 44, 0.7), rgba(26, 31, 44, 0.8)), url(${galleryImages[0]})`,
          }}
        />
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <p className="text-primary text-sm uppercase tracking-widest mb-4">Ресторан русской кухни</p>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-shadow">Золотая Русь</h2>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            Традиционные русские блюда в сердце Москвы
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-accent hover:bg-accent/90" onClick={() => scrollToSection('menu')}>
              <Icon name="UtensilsCrossed" size={20} className="mr-2" />
              Посмотреть меню
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-background" onClick={() => scrollToSection('booking')}>
              <Icon name="Calendar" size={20} className="mr-2" />
              Забронировать стол
            </Button>
          </div>
        </div>
      </section>

      <section id="menu" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <p className="text-primary text-sm uppercase tracking-widest mb-2">Наше меню</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Традиционные блюда</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Аутентичные рецепты, передающиеся из поколения в поколение
            </p>
          </div>

          <Tabs defaultValue="cold" className="w-full">
            <TabsList className="w-full flex-wrap h-auto gap-2 bg-card mb-8">
              <TabsTrigger value="cold" className="flex items-center gap-2">
                <Icon name="Apple" size={16} />
                Холодные закуски
              </TabsTrigger>
              <TabsTrigger value="salads" className="flex items-center gap-2">
                <Icon name="Salad" size={16} />
                Салаты
              </TabsTrigger>
              <TabsTrigger value="soups" className="flex items-center gap-2">
                <Icon name="Soup" size={16} />
                Супы
              </TabsTrigger>
              <TabsTrigger value="hot" className="flex items-center gap-2">
                <Icon name="Beef" size={16} />
                Горячие блюда
              </TabsTrigger>
              <TabsTrigger value="sides" className="flex items-center gap-2">
                <Icon name="UtensilsCrossed" size={16} />
                Гарниры и соусы
              </TabsTrigger>
              <TabsTrigger value="bakery" className="flex items-center gap-2">
                <Icon name="Croissant" size={16} />
                Выпечка
              </TabsTrigger>
              <TabsTrigger value="desserts" className="flex items-center gap-2">
                <Icon name="IceCream" size={16} />
                Десерты
              </TabsTrigger>
              <TabsTrigger value="drinks" className="flex items-center gap-2">
                <Icon name="Coffee" size={16} />
                Напитки
              </TabsTrigger>
              <TabsTrigger value="alcohol" className="flex items-center gap-2">
                <Icon name="Wine" size={16} />
                Алкоголь
              </TabsTrigger>
            </TabsList>

            {Object.entries(menuItems).map(([category, items]) => (
              <TabsContent key={category} value={category} className="animate-fade-in">
                <div className="grid gap-4 md:grid-cols-2">
                  {items.map((item, idx) => (
                    <Card key={idx} className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all hover:scale-[1.02]">
                      <CardContent className="p-6 flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                        </div>
                        <div className="text-primary font-bold text-xl whitespace-nowrap">
                          {item.price} ₽
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <p className="text-primary text-sm uppercase tracking-widest mb-2">О ресторане</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Традиции русской кухни</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                "Золотая Русь" - это место, где традиции русской кухни встречаются с современным комфортом. 
                Расположенный в самом центре Москвы, наш ресторан предлагает гостям погрузиться в атмосферу 
                старинной России.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Мы используем только свежие продукты и проверенные временем рецепты, чтобы каждое блюдо 
                напоминало вам о домашнем уюте и настоящем русском гостеприимстве.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">15+</div>
                  <div className="text-sm text-muted-foreground">лет работы</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">100+</div>
                  <div className="text-sm text-muted-foreground">блюд в меню</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">посадочных мест</div>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden animate-scale-in">
              <img 
                src={galleryImages[1]} 
                alt="Интерьер ресторана" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <p className="text-primary text-sm uppercase tracking-widest mb-2">Галерея</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Наши блюда</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="relative h-64 rounded-lg overflow-hidden group animate-scale-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <img src={img} alt={`Блюдо ${idx + 1}`} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <p className="text-primary text-sm uppercase tracking-widest mb-2">Отзывы</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Что говорят наши гости</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, idx) => (
              <Card key={idx} className="bg-card border-primary/20 animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{review.text}"</p>
                  <p className="font-semibold text-primary">{review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="delivery" className="py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="animate-fade-in">
            <p className="text-primary text-sm uppercase tracking-widest mb-2">Доставка</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Доставим русское гостеприимство к вам домой</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Icon name="Clock" size={32} className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Быстрая доставка</h3>
                <p className="text-muted-foreground text-sm">В течение 60 минут</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Icon name="MapPin" size={32} className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">По всей Москве</h3>
                <p className="text-muted-foreground text-sm">В пределах МКАД</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Icon name="Package" size={32} className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Упаковка</h3>
                <p className="text-muted-foreground text-sm">Сохраняем температуру</p>
              </div>
            </div>
            <Button size="lg" className="mt-8 bg-accent hover:bg-accent/90">
              <Icon name="Phone" size={20} className="mr-2" />
              Заказать доставку: +7 (495) 123-45-67
            </Button>
          </div>
        </div>
      </section>

      <section id="booking" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12 animate-fade-in">
            <p className="text-primary text-sm uppercase tracking-widest mb-2">Бронирование</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Забронировать стол</h2>
            <p className="text-muted-foreground">Заполните форму, и мы свяжемся с вами для подтверждения</p>
          </div>
          <Card className="bg-card border-primary/20 animate-scale-in">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Ваше имя</label>
                  <Input 
                    placeholder="Иван Иванов" 
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Телефон</label>
                  <Input 
                    placeholder="+7 (999) 123-45-67" 
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Дата</label>
                    <Input 
                      type="date" 
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Время</label>
                    <Input 
                      type="time" 
                      value={bookingForm.time}
                      onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Количество гостей</label>
                  <Input 
                    type="number" 
                    placeholder="2" 
                    min="1"
                    value={bookingForm.guests}
                    onChange={(e) => setBookingForm({...bookingForm, guests: e.target.value})}
                  />
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90" size="lg">
                  <Icon name="Check" size={20} className="mr-2" />
                  Забронировать
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <p className="text-primary text-sm uppercase tracking-widest mb-2">Контакты</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Мы ждем вас</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-card border-primary/20 text-center animate-scale-in">
              <CardContent className="p-6">
                <Icon name="MapPin" size={32} className="text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Адрес</h3>
                <p className="text-muted-foreground text-sm">Центр Москвы, Россия</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-primary/20 text-center animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-6">
                <Icon name="Phone" size={32} className="text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Телефон</h3>
                <p className="text-muted-foreground text-sm">+7 (495) 123-45-67</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-primary/20 text-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-6">
                <Icon name="Clock" size={32} className="text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Часы работы</h3>
                <p className="text-muted-foreground text-sm">Ежедневно: 11:00 - 23:00</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-card/50 border-t border-primary/20 py-8 px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold text-primary mb-4">🏛️ Золотая Русь</h3>
          <p className="text-muted-foreground mb-4">Ресторан русской кухни в центре Москвы</p>
          <div className="flex justify-center gap-4 mb-4">
            <Icon name="Instagram" size={24} className="text-primary hover:text-accent cursor-pointer transition-colors" />
            <Icon name="Facebook" size={24} className="text-primary hover:text-accent cursor-pointer transition-colors" />
            <Icon name="MessageCircle" size={24} className="text-primary hover:text-accent cursor-pointer transition-colors" />
          </div>
          <p className="text-sm text-muted-foreground">© 2024 Золотая Русь. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
