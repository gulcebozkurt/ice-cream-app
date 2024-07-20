import { render, screen } from "@testing-library/react";
import Card from ".";
import userEvent from "@testing-library/user-event";

const item = {
    name: "Chocolate",
    imagePath: "/images/chocolate.png",
    id: "bcf1",
};

// Prop olarak veri alan bir bileşeni test ediyorsak bileşenin aldığı propları göndermemiz gerekir
test("Miktar, başlık ve fotoğraf gelen propa göre ekrana basılır", () => {
    render(
        <Card
            item={item}
            amount={5}
            addToBasket={() => { }}
            clearFromBasket={() => { }}
        />
    );

    // miktar spanını çağırma
    const amount = screen.getByTestId("amount");

    // span içeriği 5 mi kontrol etme
    expect(amount.textContent).toBe("5");

    // chocalate yazısı ekrana geldi mi kontrol etme

    screen.getByText("Chocolate");

    // resim elementi çağırma
    const img = screen.getByAltText("çeşit-resim");

    // resmin kaynağı doğru mu kontrol etme
    expect(img).toHaveAttribute("src", "/images/chocolate.png");
});

test("Butonlara tıklanınca fonksiyonlar doğru parametrelerle çağrılır", async () => {
    const user = userEvent.setup();

    // test fonksiyonlar çağrıldı mı ve doğru paramtreler gönderlidi mi testleri için mock işlevini kullanırız
    const addMockFn = jest.fn();
    const clearMockFn = jest.fn();

    render(
        <Card
            item={item}
            amount={3}
            addToBasket={addMockFn}
            clearFromBasket={clearMockFn}
        />
    );

    // butonları alma
    const addBtn = screen.getByRole("button", { name: /ekle/i });
    const clearBtn = screen.getByRole("button", { name: /sıfırla/i });

    // ekle butonuna tıklama
    await user.click(addBtn);

    // addToBasket methodu doğru parametrelerle çağrıldı mı
    expect(addMockFn).toHaveBeenCalledWith(item);

    // sıfırla butonuna tıklama
    await user.click(clearBtn);

    // clearFromBasket methodu doğru parametrelerle çağrıldı mı
    expect(clearMockFn).toHaveBeenCalledWith(item.id);
});
