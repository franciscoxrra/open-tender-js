import { getMinutesfromDate, time24ToMinutes } from './datetimes'

export const makeValidDeals = (
  deals,
  orderType,
  serviceType,
  revenueCenterId
) => {
  if (!deals || !deals.length) return []
  if (orderType) {
    deals = deals.filter((i) => !i.order_type || i.order_type === orderType)
  }
  if (serviceType) {
    deals = deals.filter(
      (i) => !i.service_type || i.service_type === serviceType
    )
  }
  if (revenueCenterId) {
    deals = deals.filter(
      (i) =>
        !i.revenue_centers.length ||
        i.revenue_centers
          .map((r) => r.revenue_center_id)
          .includes(revenueCenterId)
    )
  }
  const minutes = getMinutesfromDate(new Date())
  deals = deals.filter((i) => {
    if (!i.dayparts.length) return true
    const validDayparts = i.dayparts.filter((d) => {
      const start = time24ToMinutes(d.start_time)
      const end = time24ToMinutes(d.end_time)
      return start <= minutes <= end
    })
    return validDayparts.length > 0
  })
  return deals
}
