# **Rage trade TT**

## **Запуск**

1. Установка зависимостей:

    ```bash
    npm install
    ```

2. Запуск приложения в режиме разработки:

    ```bash
    npm run dev
    ```

3. Сборка для продакшена:

    ```bash
    npm run build
    ```

4. Запуск собранного приложения:

    ```bash
    npm start
    ```

## **Краткое описание проекта**

Приложение позволяет пользователям подключать Ethereum-кошельки, проверять балансы токенов на сетях Arbitrum, Optimism, Hyperliquid и отправлять токены другим адресатам. Оно построено на **Next.js**, **React**, **Wagmi v2** и других библиотек, с акцентом на производительность и минимизацию RPC-запросов.

---

## **Основные технологии**

- **Next.js (App Router)**: Фреймворк для серверного и клиентского рендеринга.
- **Wagmi v2**: Управление Ethereum-кошельками и транзакциями.
- **Tanstack Query v5**: Асинхронная загрузка и закеширование данных.
- **LocalForage**: Локальное кеширование метаданных токенов для снижения количество запросов.
- **TailwindCSS** + **ShadcnUI**: Стилизация UI.
- **Solar Icon Set**: Иконки UI.
- **Zod** для валидации запросов и операций с Localforage

---

## **Функционал**

### **1. Подключение кошельков**

- Поддержка Ethereum-кошельков через Wagmi (MetaMask, WalletConnect и др.).
- Копирование и отображение адресов.

---

### **2. Отображение балансов**

- Баланс токенов отображается для сетей **Ethereum** ,**Arbitrum**, **Optimism** и платформы **Hyperliquid**.
- Балансы кешируются в Client-Side с использованием **Tanstack Query**:
- Метаданные токенов (name, symbol, decimals, logo) хранятся на клиенте в indexeddb, при чтении значения парсятся через схему zod

```ts

    getItem<K extends keyof z.infer<T>>(
        key: K extends string ? K : never,
    ): Promise<z.infer<T>[K] | undefined> {
        return this.instance
            .getItem(key)
            .then((value) => {
                if (value === null) return undefined;

                return this.schema.shape[key].parse(value) as z.infer<T>[K];
            })
            .catch((e) => {
                console.log(e);
                this.clear();
                return undefined;
            });
    }
```

---

### **3. Переводы токенов**

- Перевод любого поддерживаемого токена в рамках заданных сетей.

---

## **Оптимизация: LocalForage**

### **Локальное кеширование метаданных токенов**

- **Для минимизации RPC-запросов** используется библиотека **LocalForage**.
- Метаданные токенов охраняются после первого запроса.

**Пример сохранения данных:**

await `tokensMetadataStore.setItem('metadata', tokenMetadata);`

**Загрузка данных:**

Если данные уже сохранены, они подгружаются и используются в useQuery как initialData

---

## **Развертывание**

- Развертывание через **Vercel**.
- Файл окружения `.env` для работы с API
-
- ### **Необходимые переменные окружения**

Создайте файл `.env` в корне проекта и добавьте следующие переменные:

```env
NEXT_PUBLIC_WC_PROJECT_ID=a110969db1795d33898ce4f84db2d9d5
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_SIGNIN_MESSAGE="Sign in Rage Trade TT"
NEXT_PUBLIC_COINGECKO_API_KEY=CG-z9ZqSr6JCvrFiLUAzTPwLbtL
NEXT_PUBLIC_ALCHEMY_API_KEY=6ufmo_7Db8-Y1VY1-sfnP4qxZggKG_0k
NEXTAUTH_SECRET=session-super-secret
NEXT_PUBLIC_APP_NAME=Rage_Trade_TT
NEXT_PUBLIC_LOCALFORAGE_STORE_VERSION=1
```

---

## **Заключение**

Приложение оптимизировано для работы с Web3, минимизации RPC-запросов и обеспечивает быстрый пользовательский интерфейс, за счет использования **LocalForage** и асинхронной загрузки данных. Оно поддерживает масштабирование через расширение поддерживаемых сетей и токенов.
