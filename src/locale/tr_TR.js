import keyValues from './keyValues';

export default {
  [keyValues.pages] : {
    [keyValues.signup]: {
      [keyValues.title] : 'Üye Ol'
    },
    [keyValues.login]: {
      [keyValues.title] : 'Giriş Yap'
    },
    [keyValues.home]: {
      [keyValues.home] : 'Ana Sayfa'
    }
  },
  [keyValues.common]: {
    [keyValues.current_language]: 'Geçerli dil : "{{lng}}"',
    [keyValues.turkish]: 'Türkçe',
    [keyValues.english]: 'English',
    [keyValues.loading] : 'Yükleniyor',
    [keyValues.home_welcome_tex]: "Merhaba!!! Henüz fatura eklemediniz. Bir tane ekleyerek başlayabilirsiniz.",
    [keyValues.my_invoices]: 'Faturalarım',
    [keyValues.add_invoice_category_text]: 'Fatura Kategorisi Ekle',
    [keyValues.invoice_name]: 'Fatura İsmi',
    [keyValues.add]: 'Ekle',
    [keyValues.delete]: 'Sil'
  },
  [keyValues.forms]: {
    [keyValues.username]: 'Kullanıcı Adı',
    [keyValues.email]: 'E-mail',
    [keyValues.password]: 'Şifre',
    [keyValues.password_again]: 'Şifre Tekrarı',
    [keyValues.form_signup_button]: 'Üye Ol',
    [keyValues.form_signin_button]: 'Giriş Yap'
  },
  [keyValues.errors]: {
    [keyValues.email_form_type_error]: 'E-mail geçerli değil',
    [keyValues.input_form_empty_error]: `Bu alan boş olamaz`,
    [keyValues.password_confirmation_error]: `Şifreler eşleşmiyor`,
  }
};