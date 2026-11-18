import type { Locale } from './routes';

// Privacy notice for the enquiry form. DRAFT for owner/legal review (Block 07,
// IMPLEMENTATION-DECISIONS.md §3). Rebuilt for this site from the owner's earlier policy:
// Webwave hosting, online chat, Google Analytics, remarketing and social cookies are not
// carried over because this site does not use them. Polish needs native review.

export interface PrivacySection {
  heading: string;
  paragraphs?: string[];
  items?: string[];
}

export interface PrivacyContent {
  title: string;
  draftNote: string;
  intro: string;
  sections: PrivacySection[];
  back: string;
}

const CONTACT = 'ksiegowosc@universum-blc.com.pl';

export const privacyContent: Record<Locale, PrivacyContent> = {
  en: {
    title: 'Privacy notice',
    draftNote: 'Draft for owner/legal review. Not legal advice.',
    intro: 'This notice explains how personal data submitted through the enquiry form on this website is processed.',
    sections: [
      {
        heading: '1. Controller',
        paragraphs: [
          'The controller of your personal data is Universum-BLC sp. z o.o., ul. Hutnicza 5, 81-061 Gdynia, Poland.',
          `Privacy contact: ${CONTACT}`,
        ],
      },
      {
        heading: '2. Data, purpose and legal basis',
        paragraphs: [
          'When you submit the enquiry form we process the data you enter: your name and work email (required), and, if you provide them, your company, phone number, shipment or project description and indicative timing.',
          'We use this data to read and answer your enquiry and to arrange contact about your shipment. The legal basis is our legitimate interest in answering business enquiries (Article 6(1)(f) GDPR) and, where you ask for it, steps taken before entering into a contract (Article 6(1)(b) GDPR).',
          'Providing data is voluntary, but without a name and a work email we cannot respond. The checkbox in the form confirms that you have read this notice; it is not a marketing consent. We do not use enquiry data for marketing without a separate legal basis.',
        ],
      },
      {
        heading: '3. Recipients',
        paragraphs: [
          'Enquiries are delivered by email to authorised employees and collaborators of Universum-BLC who handle them.',
          'We use service providers acting on our behalf: a hosting provider (Vercel) that serves this website and runs the form endpoint, and an email delivery provider (Resend) that sends the enquiry to us.',
        ],
      },
      {
        heading: '4. Transfers outside the EEA',
        paragraphs: [
          'These providers may process data outside the European Economic Area, including in the United States. Transfers rely on the safeguards offered by the provider under data protection law, such as standard contractual clauses or an adequacy decision.',
        ],
      },
      {
        heading: '5. Retention',
        paragraphs: [
          'We keep enquiries for 12 months from the last correspondence and then delete them, unless longer storage is necessary to establish, pursue or defend legal claims or to meet legal obligations. Provider logs are kept only for the period set by the provider and do not contain the content of your enquiry.',
        ],
      },
      {
        heading: '6. Your rights',
        paragraphs: ['You have the right to:'],
        items: [
          'access your personal data;',
          'have it rectified or erased;',
          'restrict its processing;',
          'receive it in a portable format;',
          'object to processing based on legitimate interest.',
        ],
      },
      {
        heading: '7. Complaints',
        paragraphs: [
          'You can lodge a complaint with the President of the Personal Data Protection Office (Prezes Urzędu Ochrony Danych Osobowych), ul. Stawki 2, 00-193 Warszawa, Poland.',
        ],
      },
      {
        heading: '8. Cookies, analytics and automated decisions',
        paragraphs: [
          'This website does not set cookies and does not use analytics, advertising or social-media trackers. The hosting provider may process technical connection data (for example IP address and time) to deliver the site and protect it from abuse.',
          'We do not take decisions about you based solely on automated processing, and we do not profile you.',
        ],
      },
    ],
    back: 'Back to the site',
  },
  pl: {
    title: 'Informacja o prywatności',
    draftNote: 'Wersja robocza do weryfikacji przez właściciela i prawnika. Nie stanowi porady prawnej.',
    intro: 'Poniżej wyjaśniamy, w jaki sposób przetwarzamy dane osobowe przekazane przez formularz zapytania na tej stronie.',
    sections: [
      {
        heading: '1. Administrator danych',
        paragraphs: [
          'Administratorem Twoich danych osobowych jest Universum-BLC sp. z o.o., ul. Hutnicza 5, 81-061 Gdynia.',
          `Kontakt w sprawach prywatności: ${CONTACT}`,
        ],
      },
      {
        heading: '2. Zakres danych, cel i podstawa prawna',
        paragraphs: [
          'Po wysłaniu formularza przetwarzamy dane, które wpisujesz: imię i nazwisko oraz służbowy adres e-mail (wymagane) oraz, jeśli je podasz, nazwę firmy, numer telefonu, opis przesyłki lub projektu i orientacyjny termin.',
          'Używamy tych danych, aby zapoznać się z zapytaniem, odpowiedzieć na nie i umówić kontakt w sprawie przesyłki. Podstawą prawną jest nasz prawnie uzasadniony interes polegający na odpowiadaniu na zapytania biznesowe (art. 6 ust. 1 lit. f RODO) oraz, jeśli o to prosisz, podjęcie działań przed zawarciem umowy (art. 6 ust. 1 lit. b RODO).',
          'Podanie danych jest dobrowolne, ale bez imienia i nazwiska oraz służbowego adresu e-mail nie możemy odpowiedzieć. Pole wyboru w formularzu potwierdza zapoznanie się z tą informacją i nie jest zgodą marketingową. Nie używamy danych z zapytania do celów marketingowych bez odrębnej podstawy prawnej.',
        ],
      },
      {
        heading: '3. Odbiorcy danych',
        paragraphs: [
          'Zapytania trafiają pocztą e-mail do upoważnionych pracowników i współpracowników Universum-BLC, którzy się nimi zajmują.',
          'Korzystamy z podmiotów działających w naszym imieniu: dostawcy hostingu (Vercel), który udostępnia stronę i obsługuje formularz, oraz dostawcy poczty transakcyjnej (Resend), który przekazuje nam zapytanie.',
        ],
      },
      {
        heading: '4. Przekazywanie danych poza EOG',
        paragraphs: [
          'Podmioty te mogą przetwarzać dane poza Europejskim Obszarem Gospodarczym, w tym w Stanach Zjednoczonych. Przekazanie opiera się na zabezpieczeniach przewidzianych w przepisach o ochronie danych, takich jak standardowe klauzule umowne lub decyzja stwierdzająca odpowiedni stopień ochrony.',
        ],
      },
      {
        heading: '5. Okres przechowywania',
        paragraphs: [
          'Zapytania przechowujemy przez 12 miesięcy od ostatniej korespondencji, a następnie usuwamy, chyba że dłuższe przechowywanie jest konieczne do ustalenia, dochodzenia lub obrony roszczeń albo do wypełnienia obowiązków prawnych. Logi dostawców są przechowywane tylko przez okres wskazany przez dostawcę i nie zawierają treści zapytania.',
        ],
      },
      {
        heading: '6. Twoje prawa',
        paragraphs: ['Przysługuje Ci prawo do:'],
        items: [
          'dostępu do danych osobowych,',
          'ich sprostowania lub usunięcia,',
          'ograniczenia przetwarzania,',
          'przenoszenia danych,',
          'wniesienia sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie.',
        ],
      },
      {
        heading: '7. Skarga do organu nadzorczego',
        paragraphs: [
          'Możesz złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa.',
        ],
      },
      {
        heading: '8. Pliki cookies, analityka i zautomatyzowane decyzje',
        paragraphs: [
          'Ta strona nie zapisuje plików cookies i nie korzysta z narzędzi analitycznych, reklamowych ani z modułów mediów społecznościowych. Dostawca hostingu może przetwarzać techniczne dane połączenia (np. adres IP i czas), aby udostępniać stronę i chronić ją przed nadużyciami.',
          'Nie podejmujemy wobec Ciebie decyzji opartych wyłącznie na zautomatyzowanym przetwarzaniu i nie profilujemy Cię.',
        ],
      },
    ],
    back: 'Wróć do strony',
  },
};
