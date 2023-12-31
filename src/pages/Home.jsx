import { Container, CountryList, Heading, Loader, Section } from 'components';
import { useEffect, useState } from 'react';
import { getCountries } from 'service/country-service';

export const Home = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchCountries = async () => {
      try {
        const data = await getCountries();
        setCountries(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  return (
    <Section>
      <Container>
        {loading && <Loader />}{' '}
        {error && <Heading>Error! {error.message} </Heading>}
        <CountryList countries={countries} />
      </Container>
    </Section>
  );
};
