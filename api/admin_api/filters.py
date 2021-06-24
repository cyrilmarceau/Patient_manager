from django_filters import MultipleChoiceFilter, CharFilter, RangeFilter, DateFromToRangeFilter, rest_framework as filters

from django_filters.widgets import QueryArrayWidget

from core.models import User

# setup the logging system
import logging

logger = logging.getLogger(__name__)


class UsersFilter(filters.FilterSet):

    # Check if field contain search
    id = CharFilter(field_name='id', lookup_expr='exact')
    city = CharFilter(field_name='city', lookup_expr='icontains')
    zipcode = CharFilter(field_name='zipcode', lookup_expr='icontains')
    firstname = CharFilter(field_name='firstname', lookup_expr='icontains')
    lastname = CharFilter(field_name='lastname', lookup_expr='icontains')
    email = CharFilter(field_name='email', lookup_expr='icontains')

    class Meta:
        model = User
        fields = ['id', 'city', 'zipcode', 'firstname', 'lastname', 'email']

