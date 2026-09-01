const customerService = require('../service/service')

async function getCustomers(req, res) {
  const customers = await customerService.getCustomers()
  return res.json(customers)
}

async function getCustomersByQueryParam(req, res) {
  const name = req.query.name

  const querySearch = await customerService.getCustomersByQueryParam(name)
  return res.json(querySearch)
}

async function getCustomersById(req, res) {
  const id = Number(req.params.id)

  const customer = await customerService.getCustomersByIdOrThrow(id)
  return res.json(customer)
}

async function postNewCustomer(req, res) {
  const { name } = req.body || {}

  const user = await customerService.postNewCustomer(name)
  return res.status(201).json(user)
}

async function updateCustomer(req, res) {
  const id = Number(req.params.id)
  const { name } = req.body || {}
  const updatedCustomer = await customerService.updateCustomer(name, id)

  return res.status(200).json(updatedCustomer)
}

async function deleteCustomer(req, res) {
  const id = Number(req.params.id)

  await customerService.deleteCustomer(id)

  return res.status(204).send()
}

async function getPhonesAndCustomerName(req, res, next) {
  try {
    const phonesAndCustomer = await customerService.getPhonesAndCustomerName()
    return res.status(200).json(phonesAndCustomer)
  } catch (error) {
    next(error)
  }
}

async function postNewPhone(req, res, next) {
  try {
    const id = Number(req.params.id)
    const { phone } = req.body || {}

    const newPhone = await customerService.postNewPhone(phone, id)
    return res.status(201).json(newPhone)
  } catch (error) {
    next(error)
  }
}

async function getPhonesByCustomerId(req, res, next) {
  try {
    const id = Number(req.params.id)
    const phones = await customerService.getPhonesByCustomerId(id)
    return res.status(200).json(phones)
  } catch (error) {
    next(error)
  }
}

async function getPhoneByNumber(req, res, next) {
  try {
    const phone = req.query.phone
    const querySearch = await customerService.getPhoneByNumber(phone)
    return res.status(200).json(querySearch)
  } catch (error) {
    next(error)
  }
}

async function deletePhoneFromCustomer(req, res, next) {
  try {
    const customerId = Number(req.params.id)
    const phoneId = Number(req.params.phoneId)

    await customerService.deletePhoneFromCustomer(customerId, phoneId)
    return res.status(204).send()
  } catch (error) {
    next(error)
  }
}

async function updatePhone(req, res, next) {
  try {
    const phoneId = Number(req.params.phoneId)
    const customerId = Number(req.params.id)
    const { phone } = req.body || {}

    await customerService.updatePhone(phoneId, customerId, phone)
    return res.status(204).send()
  } catch (error) {
    next(error)
  }
}

async function getCustomerWithPhones(req, res, next) {
  try {
    const customerId = Number(req.params.id)
    const customerWithPhones =
      await customerService.getCustomerWithPhones(customerId)

    return res.status(200).json(customerWithPhones)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  postNewCustomer,
  getCustomers,
  getCustomersById,
  getCustomersByQueryParam,
  updateCustomer,
  deleteCustomer,
  postNewPhone,
  getPhonesByCustomerId,
  deletePhoneFromCustomer,
  getPhonesAndCustomerName,
  getPhoneByNumber,
  updatePhone,
  getCustomerWithPhones,
}
