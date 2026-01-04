import { useState } from 'react';
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

const cases: CaseType[] = [
  {
    id: '1',
    name: 'Стартовый кейс',
    price: 100,
    image: '📦',
    rarity: 'common',
    items: [
      { id: '1', name: 'Бронзовая монета', rarity: 'common', image: '🪙' },
      { id: '2', name: 'Деревянный меч', rarity: 'common', image: '🗡️' },
      { id: '3', name: 'Зелье здоровья', rarity: 'rare', image: '🧪' },
      { id: '4', name: 'Магический кристалл', rarity: 'epic', image: '💎' },
    ],
  },
  {
    id: '2',
    name: 'Редкий кейс',
    price: 500,
    image: '🎁',
    rarity: 'rare',
    items: [
      { id: '5', name: 'Серебряное кольцо', rarity: 'rare', image: '💍' },
      { id: '6', name: 'Огненный посох', rarity: 'epic', image: '🔥' },
      { id: '7', name: 'Драконья чешуя', rarity: 'legendary', image: '🐉' },
      { id: '8', name: 'Золотой слиток', rarity: 'gold', image: '🏆' },
    ],
  },
  {
    id: '3',
    name: 'Эпический кейс',
    price: 1500,
    image: '✨',
    rarity: 'epic',
    items: [
      { id: '9', name: 'Королевская корона', rarity: 'epic', image: '👑' },
      { id: '10', name: 'Легендарный щит', rarity: 'legendary', image: '🛡️' },
      { id: '11', name: 'Магический артефакт', rarity: 'legendary', image: '🔮' },
      { id: '12', name: 'Джекпот', rarity: 'gold', image: '💰' },
    ],
  },
  {
    id: '4',
    name: 'Легендарный кейс',
    price: 5000,
    image: '🌟',
    rarity: 'legendary',
    items: [
      { id: '13', name: 'Звездный меч', rarity: 'legendary', image: '⚔️' },
      { id: '14', name: 'Крылья феникса', rarity: 'legendary', image: '🦅' },
      { id: '15', name: 'Космический кристалл', rarity: 'gold', image: '🌌' },
      { id: '16', name: 'Супер Джекпот', rarity: 'gold', image: '🎰' },
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
  const [balance, setBalance] = useState(10000);
  const [inventory, setInventory] = useState<Item[]>([]);
  const [isOpening, setIsOpening] = useState(false);
  const [wonItem, setWonItem] = useState<Item | null>(null);

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

        <Tabs defaultValue="shop" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-card/50 backdrop-blur">
            <TabsTrigger value="shop" className="data-[state=active]:bg-primary">
              <Icon name="Store" size={20} className="mr-2" />
              Магазин
            </TabsTrigger>
            <TabsTrigger value="inventory" className="data-[state=active]:bg-primary">
              <Icon name="Backpack" size={20} className="mr-2" />
              Инвентарь ({inventory.length})
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-primary">
              <Icon name="User" size={20} className="mr-2" />
              Профиль
            </TabsTrigger>
          </TabsList>

          <TabsContent value="shop" className="space-y-6">
            {isOpening && (
              <Card className="p-12 text-center bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/50">
                <div className="relative mx-auto w-32 h-32 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full animate-spin-slow opacity-50 blur-xl"></div>
                  <div className="relative flex items-center justify-center w-full h-full text-6xl animate-pulse-glow">
                    {wonItem ? wonItem.image : '📦'}
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
                    <div className="text-5xl mb-2">{item.image}</div>
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
