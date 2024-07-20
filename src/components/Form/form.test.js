import { fireEvent, render, screen } from "@testing-library/react";
import Form from ".";

test("koşulların onaylanmasına göre buton aktifliği", () => {
    // 1-bileşenin render edilmesi
    render(<Form />);

    // 2-test edilecek elemanları çağırma (buton, chechbox)
    const button = screen.getByRole("button");
    const checkbox = screen.getByRole("checkbox");

    // 3-checkbox tiklenmemiş olduğuna bak
    expect(checkbox).not.toBeChecked();

    // 4-buton inaktif olduğuna bak
    expect(button).toBeDisabled();

    // 5-checkbox'u tikle
    fireEvent.click(checkbox);

    // 6-buton aktif mi kontrol et
    expect(button).toBeEnabled();

    // 7-checkbox'tan tiki kaldır
    fireEvent.click(checkbox);

    // 8-buton inaktif mi kontrol et
    expect(button).toBeDisabled();
});

test("butonun hover durumuna göre bildirim gözükmesi", () => {
    // 1-formu renderla
    render(<Form />);

    // 2-gerekli elemanları al
    const checkBox = screen.getByRole("checkbox");
    const button = screen.getByRole("button");
    const alert = screen.getByText(/size gerçekten/i);

    // 3-checkbox'u tikle
    fireEvent.click(checkBox);

    // 4-ekranda bildirim olmadığını kontrol et
    expect(alert).not.toBeVisible();

    // 5-mouse'u buton üzerine getir
    fireEvent.mouseEnter(button);

    // 6-ekrana bildirim var mı kontrol et
    expect(alert).toBeVisible();

    // 7-mouse'u butondan çek
    fireEvent.mouseLeave(button);

    // 8-ekranda bildirim yok mu kontrol et
    expect(alert).not.toBeVisible();
});
