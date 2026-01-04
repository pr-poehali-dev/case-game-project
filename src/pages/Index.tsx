import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';

interface Item {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'gold';
  image: string;
}

interface CaseType {
  id: string;
  name: string;
  price: number;
  image: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  items: Item[];
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
  reward: number;
  unlocked: boolean;
}

const cases: CaseType[] = [
  {
    id: '1',
    name: 'Стартовый кейс',
    price: 100,
    image: '📦',
    rarity: 'common',
    items: [
      { id: '1', name: 'Бронзовый тюлень', rarity: 'common', image: 'https://cdn.poehali.dev/projects/936770e2-cefa-47b3-b44e-9b2d8433fc38/files/ade03c2a-54b2-470f-9fd6-9448cc0aff3e.jpg' },
      { id: '2', name: 'Тюлень-воин', rarity: 'common', image: 'https://cdn.poehali.dev/projects/936770e2-cefa-47b3-b44e-9b2d8433fc38/files/2e3c2fc5-c759-4067-b52a-fca827ed5709.jpg' },
      { id: '3', name: 'Целитель-тюлень', rarity: 'rare', image: 'https://cdn.poehali.dev/projects/936770e2-cefa-47b3-b44e-9b2d8433fc38/files/d00ccd55-ab20-44a9-a5f6-d5d697c8ad2d.jpg' },
      { id: '4', name: 'Магический тюлень', rarity: 'epic', image: 'https://cdn.poehali.dev/projects/936770e2-cefa-47b3-b44e-9b2d8433fc38/files/ece0a64c-6f9e-4209-8c01-e99e6d49245d.jpg' },
    ],
  },
  {
    id: '2',
    name: 'Редкий кейс',
    price: 500,
    image: '🎁',
    rarity: 'rare',
    items: [
      { id: '5', name: 'Тюлень с кольцом', rarity: 'rare', image: 'https://cdn.poehali.dev/projects/936770e2-cefa-47b3-b44e-9b2d8433fc38/files/81950ac7-7d19-4453-96ef-576aff793754.jpg' },
      { id: '6', name: 'Огненный тюлень', rarity: 'epic', image: 'https://cdn.poehali.dev/projects/936770e2-cefa-47b3-b44e-9b2d8433fc38/files/abfd6510-14e3-44c1-b5d1-606b199670d6.jpg' },
      { id: '7', name: 'Драконий тюлень', rarity: 'legendary', image: 'https://cdn.poehali.dev/projects/936770e2-cefa-47b3-b44e-9b2d8433fc38/files/3b58234d-6496-401c-a878-01d8214dbd12.jpg' },
      { id: '8', name: 'Золотой тюлень', rarity: 'gold', image: 'https://cdn.poehali.dev/projects/936770e2-cefa-47b3-b44e-9b2d8433fc38/files/17995cfa-4432-4027-88e9-658144da9c2a.jpg' },
    ],
  },
  {
    id: '3',
    name: 'Эпический кейс',
    price: 1500,
    image: '✨',
    rarity: 'epic',
    items: [
      { id: '9', name: 'Королевский тюлень', rarity: 'epic', image: 'https://cdn.poehali.dev/projects/936770e2-cefa-47b3-b44e-9b2d8433fc38/files/35f64fcd-4ed2-465d-97b6-c707013a3edd.jpg' },
      { id: '10', name: 'Тюлень-защитник', rarity: 'legendary', image: 'https://cdn.poehali.dev/projects/936770e2-cefa-47b3-b44e-9b2d8433fc38/files/b318a87b-1a2d-40d3-80fa-93dbff8c2777.jpg' },
      { id: '11', name: 'Мистический тюлень', rarity: 'legendary', image: 'https://cdn.poehali.dev/projects/936770e2-cefa-47b3-b44e-9b2d8433fc38/files/516c37d6-0784-4314-8ae9-32f3f5b1d651.jpg' },
      { id: '12', name: 'Джекпот-тюлень', rarity: 'gold', image: 'https://cdn.poehali.dev/projects/936770e2-cefa-47b3-b44e-9b2d8433fc38/files/ba8ded99-de39-4cb3-8695-0d35687df1aa.jpg' },
    ],
  },
  {
    id: '4',
    name: 'Легендарный кейс',
    price: 5000,
    image: '🌟',
    rarity: 'legendary',
    items: [
      { id: '13', name: 'Звездный тюлень', rarity: 'legendary', image: 'https://cdn.poehali.dev/projects/936770e2-cefa-47b3-b44e-9b2d8433fc38/files/22fde086-6992-4209-975f-8a832cc7f875.jpg' },
      { id: '14', name: 'Тюлень-феникс', rarity: 'legendary', image: 'https://cdn.poehali.dev/projects/936770e2-cefa-47b3-b44e-9b2d8433fc38/files/a2a1c934-a811-4a4b-9691-3116723cc153.jpg' },
      { id: '15', name: 'Космический тюлень', rarity: 'gold', image: 'https://cdn.poehali.dev/projects/936770e2-cefa-47b3-b44e-9b2d8433fc38/files/11ef2175-a6ba-4381-bc3d-55c8beccc3be.jpg' },
      { id: '16', name: 'Супер джекпот-тюлень', rarity: 'gold', image: 'https://cdn.poehali.dev/projects/936770e2-cefa-47b3-b44e-9b2d8433fc38/files/a77c2520-998b-4e02-9cae-1c08e6a50ac4.jpg' },
    ],
  },
];

const rarityColors = {
  common: 'hsl(var(--common))',
  rare: 'hsl(var(--rare))',
  epic: 'hsl(var(--epic))',
  legendary: 'hsl(var(--legendary))',
  gold: 'hsl(var(--gold))',
};

const rarityLabels = {
  common: 'Обычный',
  rare: 'Редкий',
  epic: 'Эпический',
  legendary: 'Легендарный',
  gold: 'Золотой',
};

export default function Index() {
  const [balance, setBalance] = useState(200);
  const [inventory, setInventory] = useState<Item[]>([]);
  const [isOpening, setIsOpening] = useState(false);
  const [wonItem, setWonItem] = useState<Item | null>(null);
  const [lastBonusDate, setLastBonusDate] = useState<string | null>(null);
  const [canClaimBonus, setCanClaimBonus] = useState(true);
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: '1', name: 'Первые шаги', description: 'Открыть 1 кейс', icon: '🎯', requirement: 1, reward: 200, unlocked: false },
    { id: '2', name: 'Коллекционер', description: 'Открыть 10 кейсов', icon: '📚', requirement: 10, reward: 1000, unlocked: false },
    { id: '3', name: 'Охотник за удачей', description: 'Открыть 25 кейсов', icon: '🎲', requirement: 25, reward: 2500, unlocked: false },
    { id: '4', name: 'Легенда', description: 'Получить 5 легендарных предметов', icon: '⭐', requirement: 5, reward: 5000, unlocked: false },
    { id: '5', name: 'Золотая лихорадка', description: 'Получить 3 золотых предмета', icon: '🏆', requirement: 3, reward: 10000, unlocked: false },
  ]);

  useEffect(() => {
    const storedDate = localStorage.getItem('lastBonusDate');
    setLastBonusDate(storedDate);
    
    if (storedDate) {
      const lastDate = new Date(storedDate);
      const today = new Date();
      const isSameDay = lastDate.toDateString() === today.toDateString();
      setCanClaimBonus(!isSameDay);
    }
  }, []);

  useEffect(() => {
    checkAchievements();
  }, [inventory]);

  const claimDailyBonus = () => {
    const bonusAmount = 500;
    setBalance(balance + bonusAmount);
    const today = new Date().toISOString();
    setLastBonusDate(today);
    localStorage.setItem('lastBonusDate', today);
    setCanClaimBonus(false);
    toast.success(`Получен ежедневный бонус: ${bonusAmount} монет!`);
  };

  const checkAchievements = () => {
    const updatedAchievements = [...achievements];
    let hasNewAchievement = false;

    updatedAchievements.forEach((achievement) => {
      if (!achievement.unlocked) {
        let progress = 0;
        
        if (achievement.id === '1' || achievement.id === '2' || achievement.id === '3') {
          progress = inventory.length;
        } else if (achievement.id === '4') {
          progress = inventory.filter((i) => i.rarity === 'legendary').length;
        } else if (achievement.id === '5') {
          progress = inventory.filter((i) => i.rarity === 'gold').length;
        }

        if (progress >= achievement.requirement) {
          achievement.unlocked = true;
          hasNewAchievement = true;
          setBalance((prev) => prev + achievement.reward);
          toast.success(`Достижение разблокировано: ${achievement.name}! +${achievement.reward} монет`);
        }
      }
    });

    if (hasNewAchievement) {
      setAchievements(updatedAchievements);
    }
  };

  const openCase = (caseItem: CaseType) => {
    if (balance < caseItem.price) {
      toast.error('Недостаточно средств!');
      return;
    }

    setBalance(balance - caseItem.price);
    setIsOpening(true);
    setWonItem(null);

    setTimeout(() => {
      const randomItem = caseItem.items[Math.floor(Math.random() * caseItem.items.length)];
      setWonItem(randomItem);
      setInventory([...inventory, randomItem]);
      setIsOpening(false);
      toast.success(`Вы получили: ${randomItem.name}!`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
              CASE GAME
            </h1>
            <p className="text-muted-foreground">Открывай кейсы и получай призы!</p>
          </div>
          <Card className="px-6 py-3 bg-card/50 backdrop-blur border-primary/20">
            <div className="flex items-center gap-2">
              <Icon name="Wallet" size={24} className="text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">Баланс</p>
                <p className="text-2xl font-bold text-accent">{balance}</p>
              </div>
            </div>
          </Card>
        </header>

        {canClaimBonus && (
          <Card className="p-6 bg-gradient-to-r from-accent/20 via-secondary/20 to-primary/20 border-accent/50 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-5xl animate-bounce-in">🎁</div>
                <div>
                  <h3 className="text-xl font-bold">Ежедневный бонус</h3>
                  <p className="text-muted-foreground">Получи 500 монет прямо сейчас!</p>
                </div>
              </div>
              <Button
                onClick={claimDailyBonus}
                size="lg"
                className="bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-lg"
              >
                <Icon name="Gift" size={20} className="mr-2" />
                Забрать бонус
              </Button>
            </div>
          </Card>
        )}

        <Tabs defaultValue="shop" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-card/50 backdrop-blur">
            <TabsTrigger value="shop" className="data-[state=active]:bg-primary">
              <Icon name="Store" size={20} className="mr-2" />
              Магазин
            </TabsTrigger>
            <TabsTrigger value="inventory" className="data-[state=active]:bg-primary">
              <Icon name="Backpack" size={20} className="mr-2" />
              Инвентарь ({inventory.length})
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-primary">
              <Icon name="Trophy" size={20} className="mr-2" />
              Достижения
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-primary">
              <Icon name="User" size={20} className="mr-2" />
              Профиль
            </TabsTrigger>
          </TabsList>

          <TabsContent value="shop" className="space-y-6">
            {isOpening && (
              <Card className="p-12 text-center bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/50">
                <div className="relative mx-auto w-48 h-48 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full animate-spin-slow opacity-50 blur-xl"></div>
                  <div className="relative flex items-center justify-center w-full h-full animate-pulse-glow">
                    {wonItem ? (
                      wonItem.image.startsWith('http') ? (
                        <img src={wonItem.image} alt={wonItem.name} className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <span className="text-6xl">{wonItem.image}</span>
                      )
                    ) : (
                      <span className="text-6xl">📦</span>
                    )}
                  </div>
                </div>
                <h3 className="text-2xl font-bold">
                  {wonItem ? 'Поздравляем!' : 'Открываем кейс...'}
                </h3>
                {wonItem && (
                  <div className="mt-4 animate-bounce-in">
                    <p className="text-lg mb-2">{wonItem.name}</p>
                    <Badge
                      style={{
                        backgroundColor: rarityColors[wonItem.rarity],
                        color: 'white',
                      }}
                      className="glow"
                    >
                      {rarityLabels[wonItem.rarity]}
                    </Badge>
                  </div>
                )}
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cases.map((caseItem) => (
                <Card
                  key={caseItem.id}
                  className="overflow-hidden group hover:scale-105 transition-all duration-300 border-2 hover:border-primary hover:shadow-xl hover:shadow-primary/20"
                  style={{
                    borderColor: rarityColors[caseItem.rarity],
                  }}
                >
                  <div
                    className="h-48 flex items-center justify-center text-8xl bg-gradient-to-br from-card to-card/50 relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${rarityColors[caseItem.rarity]}20, ${rarityColors[caseItem.rarity]}10)`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                    <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                      {caseItem.image}
                    </span>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-bold text-xl mb-1">{caseItem.name}</h3>
                      <Badge
                        variant="outline"
                        style={{
                          borderColor: rarityColors[caseItem.rarity],
                          color: rarityColors[caseItem.rarity],
                        }}
                      >
                        {rarityLabels[caseItem.rarity]}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1 text-accent font-bold text-lg">
                        <Icon name="Coins" size={20} />
                        {caseItem.price}
                      </div>
                      <Button
                        onClick={() => openCase(caseItem)}
                        disabled={isOpening || balance < caseItem.price}
                        className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                      >
                        <Icon name="Package" size={16} className="mr-1" />
                        Открыть
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            {inventory.length === 0 ? (
              <Card className="p-12 text-center">
                <Icon name="PackageOpen" size={64} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-bold mb-2">Инвентарь пуст</h3>
                <p className="text-muted-foreground">Откройте кейсы, чтобы получить предметы</p>
              </Card>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {inventory.map((item, index) => (
                  <Card
                    key={index}
                    className="p-4 text-center hover:scale-105 transition-transform border-2"
                    style={{
                      borderColor: rarityColors[item.rarity],
                      background: `linear-gradient(135deg, ${rarityColors[item.rarity]}10, transparent)`,
                    }}
                  >
                    {item.image.startsWith('http') ? (
                      <img src={item.image} alt={item.name} className="w-full h-24 object-cover rounded-lg mb-2" />
                    ) : (
                      <div className="text-5xl mb-2">{item.image}</div>
                    )}
                    <p className="font-semibold text-sm mb-1">{item.name}</p>
                    <Badge
                      className="text-xs"
                      style={{
                        backgroundColor: rarityColors[item.rarity],
                        color: 'white',
                      }}
                    >
                      {rarityLabels[item.rarity]}
                    </Badge>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement) => {
                let progress = 0;
                if (achievement.id === '1' || achievement.id === '2' || achievement.id === '3') {
                  progress = inventory.length;
                } else if (achievement.id === '4') {
                  progress = inventory.filter((i) => i.rarity === 'legendary').length;
                } else if (achievement.id === '5') {
                  progress = inventory.filter((i) => i.rarity === 'gold').length;
                }
                const progressPercent = Math.min((progress / achievement.requirement) * 100, 100);

                return (
                  <Card
                    key={achievement.id}
                    className={`p-6 transition-all ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-accent/30 to-accent/10 border-accent/50'
                        : 'bg-card/50 border-muted'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`text-5xl ${
                          achievement.unlocked ? 'animate-bounce-in' : 'grayscale opacity-50'
                        }`}
                      >
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-bold mb-1">{achievement.name}</h3>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          </div>
                          {achievement.unlocked && (
                            <Badge className="bg-accent text-white">
                              <Icon name="Check" size={16} className="mr-1" />
                              Получено
                            </Badge>
                          )}
                        </div>
                        
                        <div className="space-y-2 mt-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Прогресс</span>
                            <span className="font-semibold">
                              {progress} / {achievement.requirement}
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                              style={{ width: `${progressPercent}%` }}
                            ></div>
                          </div>
                          <div className="flex items-center gap-1 text-accent font-semibold">
                            <Icon name="Award" size={16} />
                            <span>Награда: {achievement.reward} монет</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-primary/20 rounded-full">
                    <Icon name="TrendingUp" size={32} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Открыто кейсов</p>
                    <p className="text-3xl font-bold">{inventory.length}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-accent/20 to-accent/5 border-accent/30">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-accent/20 rounded-full">
                    <Icon name="Wallet" size={32} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Текущий баланс</p>
                    <p className="text-3xl font-bold">{balance}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-secondary/20 to-secondary/5 border-secondary/30">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-secondary/20 rounded-full">
                    <Icon name="Star" size={32} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Легендарных предметов</p>
                    <p className="text-3xl font-bold">
                      {inventory.filter((i) => i.rarity === 'legendary' || i.rarity === 'gold').length}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-4">Коллекция по редкости</h3>
              <div className="space-y-4">
                {(['common', 'rare', 'epic', 'legendary', 'gold'] as const).map((rarity) => {
                  const count = inventory.filter((i) => i.rarity === rarity).length;
                  return (
                    <div key={rarity} className="flex items-center gap-4">
                      <Badge
                        className="w-24"
                        style={{
                          backgroundColor: rarityColors[rarity],
                          color: 'white',
                        }}
                      >
                        {rarityLabels[rarity]}
                      </Badge>
                      <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${(count / inventory.length) * 100 || 0}%`,
                            backgroundColor: rarityColors[rarity],
                          }}
                        ></div>
                      </div>
                      <span className="font-bold w-12 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}