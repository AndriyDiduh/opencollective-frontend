import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { CurrencyPrecision } from '../../lib/constants/currency-precision';

import Container from '../Container';
import CreateExpenseFAQ from '../faqs/CreateExpenseFAQ';
import FormattedMoneyAmount from '../FormattedMoneyAmount';
import { Box } from '../Grid';
import LinkCollective from '../LinkCollective';
import LoadingPlaceholder from '../LoadingPlaceholder';
import { H5, P, Strong } from '../Text';

import ExpandableExpensePolicies from './ExpandableExpensePolicies';

/**
 * Provide some info (ie. collective balance, tags, policies, etc.) for the expense pages
 * in a sidebar.
 */
const ExpenseInfoSidebar = ({ isLoading, host, collective, children }) => {
  return (
    <Box width="100%">
      <Box display={['none', 'block']}>
        <H5 mb={3}>
          <FormattedMessage
            id="CollectiveBalance"
            defaultMessage="{type, select, COLLECTIVE {Collective balance} EVENT {Event balance} ORGANIZATION {Organization balance} FUND {Fund balance} PROJECT {Project balance} other {Account balance}}"
            values={{
              type: collective?.type, // collective can be null when it's loading
            }}
          />
        </H5>
        <Container
          borderLeft="1px solid"
          borderColor="green.600"
          pl={3}
          fontSize="H5"
          color="black.500"
          data-cy="collective-balance"
        >
          {isLoading && !collective?.balance ? (
            <LoadingPlaceholder height={28} width={75} />
          ) : (
            <FormattedMoneyAmount
              currency={collective.currency}
              amount={collective.balance}
              amountStyles={{ color: 'black.800' }}
              precision={CurrencyPrecision.DEFAULT}
            />
          )}
        </Container>
        {host && (
          <P fontSize="SmallCaption" color="black.600" mt={2}>
            <FormattedMessage
              id="withColon"
              defaultMessage="{item}:"
              values={{ item: <FormattedMessage id="Fiscalhost" defaultMessage="Fiscal Host" /> }}
            />{' '}
            <LinkCollective collective={host}>
              <Strong color="black.600">{host.name}</Strong>
            </LinkCollective>
          </P>
        )}
      </Box>
      {children && <Box my={50}>{children}</Box>}
      <ExpandableExpensePolicies host={host} collective={collective} mt={50} />
      <Box mt={50}>
        <CreateExpenseFAQ withBorderLeft withNewButtons titleProps={{ fontSize: 'H5', fontWeight: 500, mb: 3 }} />
      </Box>
    </Box>
  );
};

ExpenseInfoSidebar.propTypes = {
  isLoading: PropTypes.bool,

  /** To render custom content inside the sidebar */
  children: PropTypes.node,

  /** Must be provided if isLoading is false */
  collective: PropTypes.shape({
    currency: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    type: PropTypes.string,
  }),
  host: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};

export default React.memo(ExpenseInfoSidebar);
