SELECT c.ClientName, COUNT(cc.Id) as ContactsCount
FROM Clients
INNER JOIN ClientContacts
ON Clients.Id = ClientContacts.ClientId
GROUP BY Clients.ClientName

GO;

SELECT Clients.ClientName, COUNT(cc.Id) as ContactsCount
FROM Clients
INNER JOIN ClientContacts
ON Clients.Id = ClientContacts.ClientId
GROUP BY Clients.ClientName
HAVING COUNT(ContactsCount.Id) > 2

GO;