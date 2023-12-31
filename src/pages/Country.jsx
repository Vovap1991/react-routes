import { Section, Container, CountryInfo, Loader, Heading } from 'components';
import { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { fetchCountry } from 'service/country-service';

export const Country = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const goBackLink = location?.state?.from ?? '/';

  const { countryId } = useParams();
  useEffect(() => {
    setLoading(true);
    const country = async () => {
      try {
        const countryData = await fetchCountry(countryId);
        setData(countryData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    country();
  }, [countryId]);
  return (
    <Section>
      <Link to={goBackLink}>Go back</Link>
      <Container>
        {loading && <Loader />}
        {error && <Heading>{error.messege}</Heading>}
        <CountryInfo data={data} />
      </Container>
    </Section>
  );
};
