import { render, screen } from "@testing-library/react";
import Scoops from ".";
import userEvent from "@testing-library/user-event";

test("API'dan alınan veriler için ekrana kartlar basılır", async () => {
    render(<Scoops />);

    // ekrana basılan kartları alma
    const images = await screen.findAllByAltText("çeşit-resim");

    // gelen resimlerin(kartların) sayısı 1 den büyük veya eşit mi?
    expect(images.length).toBeGreaterThanOrEqual(1);
});

test("Çeşitlerin eklenme ve sıfırlama özellikleri toplam fiyatı etkiler", async () => {
    // userEvent kurulumu
    const user = userEvent.setup();

    // test edilecek bileşen render etme
    render(<Scoops />);

    // bütün ekleme ve sıfırlama butonlarını çağırma
    const addButtons = await screen.findAllByRole("button", { name: /ekle/i });
    const delButtons = await screen.findAllByRole("button", { name: /sıfırla/i });

    // toplam fiyat elementini çağırma
    const total = screen.getByTestId("total");

    // toplam fiyat 0 mı kontrol etme
    expect(total.textContent).toBe("0");

    // ekle butonlarından birine tıkla todo user event
    await user.click(addButtons[0]);

    // toplam fiyat 20 mı kontrol etme
    expect(total.textContent).toBe("20");

    // bir ekle butonuna iki kez tıklama
    await user.dblClick(addButtons[2]);

    // toplam fiyat 60 mı kontrol etme
    expect(total.textContent).toBe("60");

    // ilk eklenin sıfırla butonuna tıklama
    await user.click(delButtons[0]);

    // toplam fiyat 40 mı kontrol etme
    expect(total.textContent).toBe("40");

    // ikinci eklenenin sıfırla butonuna tıklama
    await user.click(delButtons[2]);

    // toplam fiyat 0 mı kontrol etme
    expect(total.textContent).toBe("0");
});
