import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

type ContactEmailProps = {
  name: string;
  email: string;
  topic: string;
  message: string;
  receivedAt: string;
};

export function ContactEmail({ name, email, topic, message, receivedAt }: ContactEmailProps) {
  return (
    <Html lang="de">
      <Head />
      <Preview>{`${topic} — Nachricht von ${name}`}</Preview>
      <Body
        style={{
          backgroundColor: '#1a1410',
          color: '#f1ece1',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          margin: 0,
          padding: '32px 16px',
        }}
      >
        <Container
          style={{
            backgroundColor: '#221a14',
            border: '1px solid #3a2e23',
            borderRadius: '8px',
            margin: '0 auto',
            maxWidth: '560px',
            padding: '32px',
          }}
        >
          <Heading
            style={{
              color: '#f1ece1',
              fontFamily: 'Georgia, serif',
              fontSize: '22px',
              lineHeight: 1.3,
              margin: '0 0 8px 0',
            }}
          >
            Neue Anfrage über die Website
          </Heading>
          <Text
            style={{
              color: '#b4a78f',
              fontSize: '13px',
              letterSpacing: '0.08em',
              margin: '0 0 24px 0',
              textTransform: 'uppercase',
            }}
          >
            {receivedAt}
          </Text>
          <Hr style={{ borderColor: '#3a2e23', margin: '24px 0' }} />
          <Section>
            <Text
              style={{
                margin: '0 0 4px 0',
                fontSize: '12px',
                color: '#b4a78f',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Name
            </Text>
            <Text style={{ margin: '0 0 16px 0', fontSize: '15px' }}>{name}</Text>
            <Text
              style={{
                margin: '0 0 4px 0',
                fontSize: '12px',
                color: '#b4a78f',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              E-Mail
            </Text>
            <Text style={{ margin: '0 0 16px 0', fontSize: '15px' }}>
              <a href={`mailto:${email}`} style={{ color: '#d1a64a' }}>
                {email}
              </a>
            </Text>
            <Text
              style={{
                margin: '0 0 4px 0',
                fontSize: '12px',
                color: '#b4a78f',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Thema
            </Text>
            <Text style={{ margin: '0 0 16px 0', fontSize: '15px' }}>{topic}</Text>
            <Text
              style={{
                margin: '0 0 4px 0',
                fontSize: '12px',
                color: '#b4a78f',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Nachricht
            </Text>
            <Text
              style={{
                margin: 0,
                fontSize: '15px',
                lineHeight: 1.65,
                whiteSpace: 'pre-wrap',
              }}
            >
              {message}
            </Text>
          </Section>
          <Hr style={{ borderColor: '#3a2e23', margin: '24px 0' }} />
          <Text
            style={{
              color: '#7a6f5c',
              fontSize: '12px',
              margin: 0,
            }}
          >
            KB! Teutonia · Parkstraße 1, 76131 Karlsruhe · kbteutonia.de
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default ContactEmail;
