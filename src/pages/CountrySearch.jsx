import {
  Container,
  SearchForm,
  Section,
  Heading,
  Loader,
  CountryList,
} from 'components';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchByRegion } from 'service/country-service';

export const CountrySearch = () => {
  const [country, setCountry] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const region = searchParams.get('query');
    if (!region) return;
    setLoading(true);
    const findCoutry = async () => {
      try {
        const selectData = await fetchByRegion(region);
        setCountry(selectData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    findCoutry();
  }, [searchParams]);

  return (
    <Section>
      <Container>
        {loading && <Loader />}
        {error && <Heading>{error.message}</Heading>}
        <SearchForm setSearchParams={setSearchParams} />
        <CountryList countries={country} />
      </Container>
    </Section>
  );
};
