import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  FormattedDate,
  MultiColumnList,
  NoValue,
} from '@folio/stripes/components';

import useReceivingHistory from './useReceivingHistory';

const columnMapping = {
  'enumeration': <FormattedMessage id="ui-inventory.enumeration" />,
  'chronology': <FormattedMessage id="ui-inventory.chronology" />,
  'receivedDate': <FormattedMessage id="ui-inventory.receivingHistory.receivedDate" />,
  'comment': <FormattedMessage id="ui-inventory.receivingHistory.comment" />,
  'source': <FormattedMessage id="ui-inventory.receivingHistory.source" />,
};
const visibleColumns = ['enumeration', 'chronology', 'receivedDate', 'comment', 'source'];
const columnFormatter = {
  'enumeration': i => i.enumeration || <NoValue />,
  'chronology': i => i.chronology || <NoValue />,
  'receivedDate': i => (i.receivedDate ? <FormattedDate value={i.receivedDate} /> : <NoValue />),
  'comment': i => i.comment || <NoValue />,
  'source': i => <FormattedMessage id={`ui-inventory.receivingHistory.source.${i.source || 'user'}`} />,
};

const HoldingReceivingHistory = ({ holding }) => {
  const { receivingHistory, isLoading } = useReceivingHistory(holding);

  if (isLoading) {
    return (
      <Accordion
        id="acc07"
        label={<FormattedMessage id="ui-inventory.receivingHistory" />}
      />
    );
  }

  return (
    <Accordion
      id="acc07"
      label={<FormattedMessage id="ui-inventory.receivingHistory" />}
      closedByDefault={!receivingHistory.length}
    >
      <MultiColumnList
        id="receiving-history-list"
        contentData={receivingHistory}
        visibleColumns={visibleColumns}
        columnMapping={columnMapping}
        formatter={columnFormatter}
      />
    </Accordion>
  );
};

HoldingReceivingHistory.propTypes = {
  holding: PropTypes.object,
};

export default HoldingReceivingHistory;